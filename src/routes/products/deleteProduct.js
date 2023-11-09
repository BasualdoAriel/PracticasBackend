const {Router}=require('express')
const router=Router()
const ProductManager=require('../../modules/productManager.js')
const productManager=new ProductManager('./ProductManager/productos.json')


router.delete('/:id', async(req,res)=>{
    let id=parseInt(req.params.id)
    let product= await productManager.getProductById(id)

    if(product){
        productManager.deleteProduct(id)
        res.setHeader('Content-Type','applicattion/json')
        return res.status(200).json({message:'Eliminado.'})
    }
    res.setHeader('Content-Type','applicattion/json')
    return res.status(400).json({message:`id invalido: ${id}`})

})

module.exports=router