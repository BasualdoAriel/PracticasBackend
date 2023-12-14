const {Router}=require('express')
const router=Router()
const CartManager=require('../../dao/managers/cartsManager.js')
const cartManager= new CartManager('./Carts/carts.json')


router.get('/:id', async(req,res)=>{
    let id=parseInt(req.params.id)
    let cart=await cartManager.getCartById(id)
    if(cart.length===0){
        res.setHeader('Content-Type','application/json')
        return res.status(404).json({error:`No existe cart con id ${id}`})
    }
    res.setHeader('Content-Type','application/json')
    res.status(200).json(cart)
})

module.exports=router