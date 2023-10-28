const fs=require('fs')
const express=require('express')

const ProductManager=require('./modules/productManager')
//const Product=require('./modules/product') No utlizo la clase, los productos están cargandos en ./ProductManager/productos.json

const PORT=3000

const app =express()
//Pruebas
//Inicializo manager
const productManager= new ProductManager('./ProductManager/productos.json')

app.use(express.urlencoded({extended:true}))

app.get('/products',async (req,res)=>{//obtengo los productos de ProductManager y, si es necesario, limito las devoluciones.
    let products= await productManager.getProducts()

    if(req.query.limit>0 && !isNaN(req.query.limit)){
        products=products.slice(0,req.query.limit)
    }
    res.setHeader('Content-Type','application/json')
    res.status(200).json({filters:req.query,products})
})

app.get('/products/:id',async(req, res)=>{ //Utilizo getProductById para buscar el producto.
    let id=parseInt(req.params.id)
    let product= await productManager.getProductById(id)
    if(product){
        res.setHeader('Content-Type','application/json')
        res.send(product)
    }else{
        res.send('No existe producto con ese id')
    }
})


const server=app.listen(PORT,()=>{
    console.log('Server UP '+PORT)
})