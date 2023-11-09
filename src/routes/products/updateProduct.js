const {Router}=require('express')
const router=Router()
const Product=require('../../modules/product')
const ProductManager=require('../../modules/productManager.js')
const productManager=new ProductManager('./ProductManager/productos.json')


router.put('/:id', async(req,res)=>{
    //buscar el prduct con el id y actualizarlo con la inf recibida de req.body
    let id=parseInt(req.params.id)
    let product= await productManager.getProductById(id)
    if(product){
        let {title,description,code,price,status,stock,category,thumbnail}=req.body
        let updatedProduct= new Product()
        updatedProduct.createProduct(title,description,code,price,status,stock,category,thumbnail)
        let fields=Object.values(updatedProduct.product)
        if(!product || fields.includes(undefined)){
            return res.status(400).json(`no se pudo agregar el producto, el mismo no fue inicializado correctatmente.`)
        }
        productManager.updateProduct(id,updatedProduct.product)
        res.setHeader('Content-Type','application/json')
        return res.status(200).json('producto actualizado.')
        
    }
    res.setHeader('Content-Type','application/json')
    return res.status(404).json({error: 'No se encuentra producot con id'})
})

module.exports=router