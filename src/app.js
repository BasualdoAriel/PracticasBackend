const express=require('express')
const path=require('path')
const {engine}=require('express-handlebars')
const {Server}=require('socket.io')
const DBMongoose=require('./connectDB.js')
const chatManager=require('./services/managers/chatManager.js')
const sessions=require('express-session')
const mongoStore=require('connect-mongo')
const initPassport=require('./config/config.passport.js')
const passport=require('passport')
const swaggerJsdoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')


//Config de servidor
const config=require('./config/config.js')

//VISTAS
const vistasProduct=require('./routes/vistasProduct.js')
const vistasSession=require('./routes/session.router.js')
const errorHandler = require('./middlewares/errorHandler.js')

const PORT=config.PORT

const app =express()


app.use(express.static('./public'))
app.engine('handlebars',engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname,'/views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(sessions(
    {
        secret:config.SECRET,
        resave:true,saveUninitialized:true,
        cookie:{
            expires:800000
        },
        store:mongoStore.create(
            {
                mongoUrl:config.MONGO_URL,
                mongoOptions:{dbName:config.DB_NAME},
                ttl:3600,
                autoRemove:'native'
            }
        )
    }
))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Api",
            version:"1.0",
            descrition:"Documentación proyecto final"
        }
    },
    apis:["./docs/*/*.yaml"]
}

const specs=swaggerJsdoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))

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
    DBMongoose.connectDB()
} catch (error) {
    console.log(error.message);
}