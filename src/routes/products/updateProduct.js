const {Router}=require('express')
const router=Router()
const ProductController=require('../../controller/products.controller.js')


router.put('/:id', ProductController.updateProduct)

module.exports=router