const {Router}=require('express')
const router=Router()
const Product=require('../../dao/product')
// const ProductManager=require('../../modules/productManagerFS.js')
// const productManager=new ProductManager('./ProductManager/productos.json')


router.put('/:id', async(req,res)=>{
    //buscar el prduct con el id y actualizarlo con la inf recibida de req.body
    let id=parseInt(req.params.id)
    let {title,description,code,price,status,stock,category,thumbnail}=req.body
    let product= new Product()
    product=await product.updateProduct(id,title,description,code,price,status,stock,category,thumbnail)
    let fields=Object.values(product)
    if(fields.length===0 ||fields.includes(undefined) ){
        return res.status(400).json(`no se encuentra producto con id ${id}.`)
    }else{
        return res.status(201).json(`Se actualizó el producto ${title}`)
    }


    //FILESYSYTEM
    // if(product){
    //     let {title,description,code,price,status,stock,category,thumbnail}=req.body
    //     let updatedProduct= new Product()
    //     updatedProduct.createProduct(title,description,code,price,status,stock,category,thumbnail)
    //     let fields=Object.values(updatedProduct.product)
    //     if(!product || fields.includes(undefined)){
    //         return res.status(400).json(`no se pudo agregar el producto, el mismo no fue inicializado correctatmente.`)
    //     }
    //     productManager.updateProduct(id,updatedProduct.product)
    //     res.setHeader('Content-Type','application/json')
    //     return res.status(200).json('producto actualizado.')
        
    // }
})

module.exports=router