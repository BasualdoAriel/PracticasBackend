const {Router}=require('express')
const router=Router()
const CartController = require('../../controller/carts.controller')

//AGREGA EL PRIMER PRODUCTO Y CREA EL CARRITO.
router.post('/', CartController.addCart)

module.exports=router