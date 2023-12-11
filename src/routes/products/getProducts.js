const {Router}=require('express')
const router=Router()
// const ProductManager=require('../../modules/productManagerFS.js')
// const productManager=new ProductManager('./ProductManager/productos.json')
const productModel=require('../../dao/models/products.model.js')

router.get('/',async (req,res)=>{//obtengo los productos de ProductManager y, si es necesario, limito las devoluciones.
    

    if(req.query.limit>0 && !isNaN(req.query.limit)){
        let products= await productModel.find().limit(req.query.limit)
        res.setHeader('Content-Type','application/json')
        return res.status(200).json({filters:req.query,products})
    }
    let products= await productModel.find()
    res.setHeader('Content-Type','application/json')
    return res.status(200).json({filters:req.query,products})
})

module.exports=router