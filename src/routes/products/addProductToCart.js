const {Router}=require('express')
const router=Router()
const CartManager=require('../../dao/cartsManager.js')
const cartManager= new CartManager('./Carts/carts.json')


router.post('/product/:id', async(req,res)=>{
    let id=parseInt(req.params.id)
    let product=req.body
    let exist= await cartManager.getCartById(id)
    if(exist===undefined){
        res.setHeader('Content-Type','application/json')
        return res.status(400).json('errr')
    }
    cartManager.addProductToCart(product,id)
    res.setHeader('Content-Type','application/json')
    res.status(200).json(`Se actualizó el carrito.`)
})

module.exports=router