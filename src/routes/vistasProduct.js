const {Router}=require('express')
const router=Router()
const ProductManager=require('../modules/productManager.js')
const productManager=new ProductManager('./ProductManager/productos.json')


router.get('/home',async(req,res)=>{
    let products= await productManager.getProducts()

    res.status(200).render('home',{titulo:'HomePage',products})
})


router.get('/realtimeproducts', async(req,res)=>{
    let products= await productManager.getProducts()
    res.status(200).render('realTimeProducts',{products})
})

module.exports=router