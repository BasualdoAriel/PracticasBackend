const {Router}=require('express')
const router=Router()
const CartController=require('../../controller/carts.controller.js')


router.get('/', CartController.getCarts)

module.exports=router