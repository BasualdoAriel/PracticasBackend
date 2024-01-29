const productModel=require('../dao/models/products.model.js')
const Product=require('../services/product.service.js')
const productManager=require('../services/productManager.service.js')


class ProductController{
    constructor(){}

    static async homePageProducs(req,res){
        let user=req.session.user
        let page=1
        let category
        let products
            if(req.query.page){
                page=parseInt(req.query.page)
            }
            if(req.query.category){
                category=req.query.category
                try {
                    products= await productModel.paginate({category:category},{lean:true, limit:5, page:page})   
                } catch (error) {
                    products=[]
                }
            }else{
                try {
                    products= await productModel.paginate({},{lean:true, limit:15, page:page})    
                } catch (error) {
                    console.log(error)
                    products=[]
                }
            }
            let {totalPages,hasNextPage,hasPrevPage,prevPage,nextPage}=products
            if(page>totalPages || isNaN(page)){
                res.status(400).json('Pagina inexisente')
            }else{
                res.status(200).render('home',{titulo:'HomePage',products:products.docs,totalPages,hasNextPage,hasPrevPage,prevPage,nextPage,category,user})
            }
    }

    static async getPrices(req,res){
        let products
    let price
    let available
    if(req.query.price==1||req.query.price==-1){
        price=parseInt(req.query.price)
        if(req.query.available==undefined){
            products= await productModel.aggregate(
                [
                    {
                        $sort:{price:price, _id:1}
                    }
                ]
            )
        }else{
            if(req.query.available=='true' || req.query.available=='false'){
                if(req.query.available=='true'){
                    available=true
                }else{
                    available=false
                }
                products= await productModel.aggregate(
                    [
                        {
                            $match:{status:available}
                        },
                        {
                            $sort:{price:price, _id:1}
                        }
                    ]
                )
            }else{
                res.status(400).json('Alguna de las query no es correcta.')    
            }
        }
    }else{
        products=[]
    }
    res.status(200).render('prices',{titulo:'HomePage',products})
    }

    static async getProducts(req,res){
        
        if(req.query.limit>0 && !isNaN(req.query.limit)){
        let products= await productModel.find().limit(req.query.limit)
        res.setHeader('Content-Type','application/json')
        return res.status(200).json({filters:req.query,products})
     }
        let products= await productModel.find()
        res.setHeader('Content-Type','application/json')
        return res.status(200).json({filters:req.query,products})
    }
    
    static async getProductById(req,res){
        let id=parseInt(req.params.id)
        let product= await productManager.getProductById(id)//busco el producto con PM
        if(Object.keys(product).length!==0){//Si el length es != 0 es porque el producto existe.
        res.setHeader('Content-Type','application/json')
        res.send(product)
        }else{
            res.send('No existe producto con ese id')
        }
    }

    static async addProduct(req,res){
        let {title,description,code,price,status,stock,category,thumbnail}=req.body
        let product= new Product()
        await product.createProduct(title,description,code,price,status,stock,category,thumbnail)
        let fields=Object.values(product.product)
        if(fields.length===0 ||fields.includes(undefined) ){
            return res.status(400).json(`no se pudo agregar el producto, el mismo no fue inicializado correctatmente.`)
        }
        await productModel.create(product.product)
        res.status(201).json(`Se agregó el producto ${product.product.title}`)
    }

    static async deleteProduct(req,res){
        let id=parseInt(req.params.id)
        let product= await productModel.find({id:id})
        if(product.length===0){//si es igual a 0 no existe prducto con ese id.        
            res.setHeader('Content-Type','applicattion/json')
            return res.status(400).json({message:`id invalido: ${id}`})
        }
        await productModel.deleteOne({id:id})//Elimina el registro 
        res.setHeader('Content-Type','applicattion/json')
        return res.status(200).json({message:'Eliminado.'})
    }

    static async updateProduct(req,res){
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
    }
}

module.exports=ProductController