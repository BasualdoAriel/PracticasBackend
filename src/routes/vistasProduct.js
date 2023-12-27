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


router.get('/home',auth,async (req,res)=>{
    let user=req.session.user
    let page=1
    let category
    let products
        if(req.query.page){
            page=parseInt(req.query.page)
        }
        if(req.query.category){
            category=req.query.category
            try {
                products= await productModel.paginate({category:category},{lean:true, limit:5, page:page})   
            } catch (error) {
                products=[]
            }
        }else{
            try {
                products= await productModel.paginate({},{lean:true, limit:15, page:page})    
            } catch (error) {
                console.log(error)
                products=[]
            }
        }
        let {totalPages,hasNextPage,hasPrevPage,prevPage,nextPage}=products
        if(page>totalPages || isNaN(page)){
            res.status(400).json('Pagina inexisente')
        }else{
            res.status(200).render('home',{titulo:'HomePage',products:products.docs,totalPages,hasNextPage,hasPrevPage,prevPage,nextPage,category,user})
        }
})

router.get('/prices', async(req,res)=>{
    let products
    let price
    let available
    if(req.query.price==1||req.query.price==-1){
        price=parseInt(req.query.price)
        if(req.query.available==undefined){
            products= await productModel.aggregate(
                [
                    {
                        $sort:{price:price, _id:1}
                    }
                ]
            )
        }else{
            if(req.query.available=='true' || req.query.available=='false'){
                if(req.query.available=='true'){
                    available=true
                }else{
                    available=false
                }
                products= await productModel.aggregate(
                    [
                        {
                            $match:{status:available}
                        },
                        {
                            $sort:{price:price, _id:1}
                        }
                    ]
                )
            }else{
                res.status(400).json('Alguna de las query no es correcta.')    
            }
        }
    }else{
        products=[]
    }
    res.status(200).render('prices',{titulo:'HomePage',products})
})


router.get('/realtimeproducts', async(req,res)=>{
    let products= await productModel.find().lean()
    res.status(200).render('realTimeProducts',{products})
})

router.get('/chat',async(req,res)=>{
    res.status(200).render('chat',{})
})

router.get('/login',auth2,(req,res)=>{
    let {error,mensaje}=req.query//recibo mensajes o errores.
 
    res.setHeader('Content-Type','text/html')
    res.status(200).render('login',{error,mensaje})
})

router.get('/register',auth2,(req,res)=>{
    let {error}=req.query //recibo error
    res.setHeader('Content-Type','text/html')
    res.status(200).render('registro',{error})
})

router.get('/profile', auth,(req,res)=>{
    let user=req.session.user //recibo usuario
    if(user.role==="admin"){//si el rol es admin, muesro la info en /profile.
        let admin=true
        res.setHeader('Content-Type','text/html')
        res.status(200).render('profile',{user,admin})
    }else{
        res.setHeader('Content-Type','text/html')
        res.status(200).render('profile',{user})
    }
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