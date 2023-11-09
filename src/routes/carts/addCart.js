const {Router}=require('express')
const router=Router()
const CartManager=require('../../modules/cartsManager.js')
const cartManager= new CartManager('./Carts/carts.json')

router.post('/', async(req,res)=>{
    let products=req.body
    await cartManager.addCart(products)
    res.setHeader('Content-Type','application/json')
    res.status(200).json('Se Agregó el carrito')
})

module.exports=router