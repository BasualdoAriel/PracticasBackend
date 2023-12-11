const express=require('express')
const path=require('path')
const {engine}=require('express-handlebars')
const {Server}=require('socket.io')
const mongoose=require('mongoose')
const chatManager=require('./dao/chatManager.js')

//VISTAS
const vistasProduct=require('./routes/vistasProduct.js')

const PORT=3000

const app =express()

app.use(express.static('./public'))
app.engine('handlebars',engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname,'/views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/',vistasProduct)



const server=app.listen(PORT,()=>{
    console.log('Server UP '+PORT)
})

const serverSokcet=new Server(server)



serverSokcet.on("connection",socket=>{
    console.log('Socket on, id: '+socket.id );
    
    // socket.on("productsUpdate",products=>{
    //     serverSokcet.emit("productsUpdate",datos)
    // })

    

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