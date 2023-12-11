const {Router}=require('express')
const router=Router()
const CartManager=require('../../dao/cartsManager.js')
const cartManager= new CartManager('./Carts/carts.json')


router.get('/', async(req,res)=>{
    let carts=await cartManager.getCarts()
    res.setHeader('Content-Type','application/json')
    res.status(200).json({carts})
})

module.exports=router