const {Router}=require('express')
const ProductController=require('../controller/products.controller.js')
const UsersController=require('../controller/users.controller')

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
const purchase= require('./carts/purchase.js')

const mocking=require('../mocking.js')
const errorHandler = require('../middlewares/errorHandler.js')


router.use(errorHandler)

const auth=(req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/login')
    }
    next()
}

const auth2=(req,res,next)=>{
    if(req.session.user){
        return res.redirect('/profile')
    }
    next()
}

router.get('/',auth,ProductController.homePageProducs)

router.get('/home',auth,ProductController.homePageProducs ) 

router.get('/prices', ProductController.getPrices)

router.get('/chat',async(req,res)=>{
    res.status(200).render('chat',{})
})

router.get('/login',auth2,UsersController.login)

router.get('/register',auth2,UsersController.register)

router.get('/profile', auth, UsersController.profile)

router.get('/mockingproducts',(req,res)=>{
   
     let products= mocking()
     res.setHeader('Content-Type','application/json')
     return res.status(200).json({filters:req.query,products})
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
router.use('/carts',purchase)



module.exports=router