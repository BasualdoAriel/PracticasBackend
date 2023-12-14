const {Router}=require('express')
const router=Router()
const ProductManager=require('../../dao/managers/productManager.js')
const productManager=new ProductManager()

router.get('/:id',async(req, res)=>{ //Utilizo getProductById para buscar el producto.
    let id=parseInt(req.params.id)
    let product= await productManager.getProductById(id)//busco el producto con PM
    if(Object.keys(product).length!==0){//Si el length es != 0 es porque el producto existe.
        res.setHeader('Content-Type','application/json')
        res.send(product)
    }else{
        res.send('No existe producto con ese id')
    }
})

module.exports=router