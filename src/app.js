const express=require('express')
const path=require('path')
const {engine}=require('express-handlebars')
const {Server}=require('socket.io')
const mongoose=require('mongoose')
const chatManager=require('./dao/managers/chatManager.js')
const sessions=require('express-session')
const mongoStore=require('connect-mongo')


//VISTAS
const vistasProduct=require('./routes/vistasProduct.js')
const vistasSession=require('./routes/session.router.js')

const PORT=3000

const app =express()

app.use(express.static('./public'))
app.engine('handlebars',engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname,'/views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(sessions(
    {
        secret:"ArielBasualdo",
        resave:true,saveUninitialized:true,
        store:mongoStore.create(
            {
                mongoUrl:'mongodb+srv://ArielBasualdo:SkHlBzll3xkLec6u@practicabackend.ezsytku.mongodb.net/?retryWrites=true&w=majority',
                mongoOptions:{dbName:'ecommerce'},
                ttl:3600,
                autoRemove:'native'
            }
        )
    }
))


app.use('/',vistasProduct)
app.use('/sessions',vistasSession)


const server=app.listen(PORT,()=>{
    console.log('Server UP '+PORT)
})

const serverSokcet=new Server(server)



serverSokcet.on("connection",socket=>{
    console.log('Socket on, id: '+socket.id );

    socket.on('mensaje', datos=>{
        chatManager(datos)
        serverSokcet.emit('nuevoMensaje', datos)
    })
})


try {
     mongoose.connect('mongodb+srv://ArielBasualdo:SkHlBzll3xkLec6u@practicabackend.ezsytku.mongodb.net/?retryWrites=true&w=majority',{dbName:'ecommerce'})
    console.log('DB ONLINE')
} catch (error) {
    console.log(error.message)
}