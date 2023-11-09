const {Router}=require('express')
const router=Router()
const ProductManager=require('../../modules/productManager.js')
const productManager=new ProductManager('./ProductManager/productos.json')

router.get('/',async (req,res)=>{//obtengo los productos de ProductManager y, si es necesario, limito las devoluciones.
    let products= await productManager.getProducts()

    if(req.query.limit>0 && !isNaN(req.query.limit)){
        products=products.slice(0,req.query.limit)
    }
    res.setHeader('Content-Type','application/json')
    res.status(200).json({filters:req.query,products})
})

module.exports=router