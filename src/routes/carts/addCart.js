const {Router}=require('express')
const cartModel = require('../../dao/models/carts.model')
const router=Router()
const CartManager=require('../../dao/managers/cartsManager.js')
const cartManager= new CartManager('./Carts/carts.json')


//AGREGA EL PRIMER PRODUCTO Y CREA EL CARRITO.
router.post('/', async(req,res)=>{
    let products=req.body
    //Verificar si existe el producto y si la cantidad es igual o mayor al que quiero agregar.
    let cart= await cartManager.addCart(products)
    await cartModel.create(cart)
    res.setHeader('Content-Type','application/json')
    res.status(200).json('Se Agregó el carrito')
})

module.exports=router