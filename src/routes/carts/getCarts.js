const {Router}=require('express')
const router=Router()
const CartManager=require('../../dao/managers/cartsManager.js')
const cartManager= new CartManager()


router.get('/', async(req,res)=>{
    let carts=await cartManager.getCarts()
    res.setHeader('Content-Type','application/json')
    res.status(200).json({carts})
})

module.exports=router