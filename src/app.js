const express=require('express')

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

const PORT=3000

const app =express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/products',getProducts)
app.use('/products',getProductById)
app.use('/products',deleteProduct)
app.use('/products',addProduct)
app.use('/products',updateProduct)
app.use('/carts',getCarts)
app.use('/carts',getCartById)
app.use('/carts',addCart)
app.use('/carts',addProductToCart)

const server=app.listen(PORT,()=>{
    console.log('Server UP '+PORT)
})
