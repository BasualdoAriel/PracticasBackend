const {Router}=require('express')
const router=Router()
const ProductManager=require('../../modules/productManager.js')
const productManager=new ProductManager('./ProductManager/productos.json')


router.get('/:id',async(req, res)=>{ //Utilizo getProductById para buscar el producto.
    let id=parseInt(req.params.id)
    let product= await productManager.getProductById(id)
    if(product){
        res.setHeader('Content-Type','application/json')
        res.send(product)
    }else{
        res.send('No existe producto con ese id')
    }
})

module.exports=router