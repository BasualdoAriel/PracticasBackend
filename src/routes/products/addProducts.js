const {Router}=require('express')
const router=Router()
const Product=require('../../dao/managers/product.js')
// const ProductManager=require('../../modules/productManagerFS.js')
// const productManager=new ProductManager('./ProductManager/productos.json')
const productModel=require('../../dao/models/products.model.js')


router.post('/', async(req,res)=>{
    let {title,description,code,price,status,stock,category,thumbnail}=req.body
    let product= new Product()
    await product.createProduct(title,description,code,price,status,stock,category,thumbnail)
    let fields=Object.values(product.product)
    if(fields.length===0 ||fields.includes(undefined) ){
        return res.status(400).json(`no se pudo agregar el producto, el mismo no fue inicializado correctatmente.`)
    }
    await productModel.create(product.product)
    res.status(201).json(`Se agregó el producto ${product.product.title}`)
})

module.exports=router