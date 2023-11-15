const express=require('express')
const path=require('path')
const {engine}=require('express-handlebars')
const {Server}=require('socket.io')

//Importo los routers
const deleteProduct=require('./routes/products/deleteProduct.js')
const addProduct=require('./routes/products/addProducts.js')
const updateProduct=require('./routes/products/updateProduct.js')
const getProducts=require('./routes/products/getProducts.js')
const getProductById=require('./routes/products/getProductById.js')
const getCarts=require('./routes/carts/getCarts.js')
const getCartById=require('./routes/carts/getCartById.js')
const addCart=require('./routes/carts/addCart.js')
const addProductToCart=require('./routes/products/addProductToCart.js')

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



//UNIFICAR
app.use('/products',getProducts)
app.use('/products',getProductById)
app.use('/products',deleteProduct)
app.use('/products',addProduct)
app.use('/products',updateProduct)
app.use('/carts',getCarts)
app.use('/carts',getCartById)
app.use('/carts',addCart)
app.use('/carts',addProductToCart)



app.use('/',vistasProduct)



const server=app.listen(PORT,()=>{
    console.log('Server UP '+PORT)
})

const serverSokcet=new Server(server)


serverSokcet.on("connection",socket=>{
    console.log('Socker on, id: '+socket.id );

    socket.on("productsUpdate",products=>{
        serverSokcet.emit("productsUpdate",datos)
    })

})