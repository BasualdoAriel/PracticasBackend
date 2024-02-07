const {Router}=require('express')
const CartController = require('../../controller/carts.controller.js')
const router=Router()

router.get('/:id/purchase', CartController.purchase)

module.exports=router