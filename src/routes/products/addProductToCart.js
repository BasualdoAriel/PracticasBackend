const {Router}=require('express')
const router=Router()
const CartManager=require('../../dao/managers/cartsManager.js')
const cartManager= new CartManager()
const ProductManager = require('../../dao/managers/productManager.js')
const productManager= new ProductManager()

router.post('/:cId/product/:pId', async(req,res)=>{
    let pId=parseInt(req.params.pId)
    let cId=parseInt(req.params.cId)
    let product= await productManager.getProductById(pId)
    let exist= await cartManager.getCartById(cId)
    
    if(exist===undefined || Object.keys(product).length===0){
        res.setHeader('Content-Type','application/json')
        return res.status(400).json('errr')
    }
    product=(product[0]._id).toString()
    cartManager.addProductToCart(product,cId)
    res.setHeader('Content-Type','application/json')
    res.status(200).json(`Se actualizó el carrito.`)
})

module.exports=router