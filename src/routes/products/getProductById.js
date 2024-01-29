const {Router}=require('express')
const router=Router()
const ProductController=require('../../controller/products.controller.js')

router.get('/:id', ProductController.getProductById)

module.exports=router