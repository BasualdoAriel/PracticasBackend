const {Router}=require('express')
const router=Router()
const CartController = require('../../controller/carts.controller.js')

router.post('/:cId/product/:pId', CartController.addProductToCart)

module.exports=router