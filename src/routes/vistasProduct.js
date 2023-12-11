const {Router}=require('express')
const productModel=require('../dao/models/products.model')
const router=Router()

const deleteProduct=require('./products/deleteProduct')
const addProduct=require('./products/addProducts.js')
const updateProduct=require('./products/updateProduct.js')
const getProducts=require('./products/getProducts.js')
const getProductById=require('./products/getProductById.js')
const getCarts=require('./carts/getCarts.js')
const getCartById=require('./carts/getCartById.js')
const addCart=require('./carts/addCart.js')
const addProductToCart=require('./products/addProductToCart.js')


router.get('/home',async(req,res)=>{
    let products= await productModel.find().lean()//convierte a json el objeto traido por mongoose
    res.status(200).render('home',{titulo:'HomePage',products})
})


router.get('/realtimeproducts', async(req,res)=>{
    let products= await productModel.find().lean()
    res.status(200).render('realTimeProducts',{products})
})

router.get('/chat',async(req,res)=>{
    res.status(200).render('chat',{})
})

router.use('/products',getProducts)
router.use('/products',getProductById)
router.use('/products',deleteProduct)
router.use('/products',addProduct)
router.use('/products',updateProduct)
router.use('/carts',getCarts)
router.use('/carts',getCartById)
router.use('/carts',addCart)
router.use('/carts',addProductToCart)


module.exports=router