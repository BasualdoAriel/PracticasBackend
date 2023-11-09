const {Router}=require('express')
const router=Router()
const Product=require('../../modules/product')
const ProductManager=require('../../modules/productManager.js')
const productManager=new ProductManager('./ProductManager/productos.json')

router.post('/', async(req,res)=>{
    let {title,description,code,price,status,stock,category,thumbnail}=req.body
    let product= new Product()
    product.createProduct(title,description,code,price,status,stock,category,thumbnail)
    let fields=Object.values(product.product)
    if(!product || fields.includes(undefined)){
        return res.status(400).json(`no se pudo agregar el producto, el mismo no fue inicializado correctatmente.`)
    }
    await productManager.addProduct(product.product)
    res.status(201).json(`Se agregó el producto ${product.product.title}`)

})

module.exports=router