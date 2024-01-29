const {Router}=require('express')
const router=Router()
const ProductController=require('../../controller/products.controller.js')

router.delete('/:id', ProductController.deleteProduct)

module.exports=router