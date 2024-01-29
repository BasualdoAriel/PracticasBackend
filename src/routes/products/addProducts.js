const {Router}=require('express')
const router=Router()
const ProductController=require('../../controller/products.controller.js')


router.post('/', ProductController.addProduct)

module.exports=router