const CartManager=require('../services/cartManager.service.js')
const cartModel=require('../dao/models/carts.model.js')
const ticketModel=require('../dao/models/ticket.model.js')
const ticketManager=require('../services/ticket.service.js')
const productManager=require('../services/productManager.service.js')
const mailing=require('../mailer.js')
const ProductService=require('../services/product.service.js')
const CustomError= require('../utils/CustomErrors.js')

const errors = require('../utils/errorTypes.js')
const Errors = require('../utils/errors.js')
const productService=new ProductService()


class CartController{
    constructor(){}

    static async getCarts(req,res){
        
        if(!req.session.user||req.session.user.role!=='admin'){
            CustomError.CustomError({
                name:'No autorizado',
                message:'Usuario no aturoizado para ingrsear al sitio',
                statusCode:errors.STATUS_CODES.ERROR_AUTH,
                code:errors.ERRORES_INTERNOS.PERMISOS,
                description:Errors.noAutorizado()
            })
            res.setHeader('Content-Type','application/json')
            res.status(401).json('No autorizado.')
            //throw CustomError.CustomError('No autorizado','Usuario no aturoizado para ingrsear al sitio',errors.STATUS_CODES.ERROR_AUTH,errors.ERRORES_INTERNOS.PERMISOS,Errors.noAutorizado())
        }else{
            let role=req.session.user.role
            let carts=await CartManager.getCarts()
            res.setHeader('Content-Type','application/json')
            res.status(200).json({carts})
            
           
        }
    
    }

    static async getCartById(req,res){
        let role=req.session.user.role
        if(role==='admin'){
            let id=parseInt(req.params.id)
            let cart=await CartManager.getCartById(id)
            if(cart.length===0){
                res.setHeader('Content-Type','application/json')
                return res.status(404).json({error:`No existe cart con id ${id}`})
            }
            res.setHeader('Content-Type','application/json')
            res.status(200).json(cart)
        }else{
            res.setHeader('Content-Type','application/json')
            res.status(401).json('No autorizado.')
        }
    }
    static async addCart(req,res){
        let products=req.body
        //Verificar si existe el producto y si la cantidad es igual o mayor al que quiero agregar.
        let cart= await CartManager.addCart(products)
        await cartModel.create(cart)
        res.setHeader('Content-Type','application/json')
        res.status(200).json('Se Agregó el carrito')
    }

    static async addProductToCart(req,res){
        let pId=parseInt(req.params.pId)
        let cId=parseInt(req.params.cId)
        let quantity=parseInt(req.body.quantity)
        let product= await productManager.getProductById(pId)
        let exist= await CartManager.getCartById(cId)        
        if(exist===undefined || Object.keys(product).length===0 || product[0].stock<=0){
            res.setHeader('Content-Type','application/json')
            return res.status(400).json('errr')
        }
        product=(product[0]._id).toString()
        CartManager.addProductToCart(product,cId,quantity)
        res.setHeader('Content-Type','application/json')
        res.status(200).json(`Se actualizó el carrito.`)
    }

    static async purchase(req,res){
        let purchaser=req.session.user.email
        let cId=parseInt(req.params.id)
        let cart= await CartManager.getCartById(cId)
         if(cart.length===0){
             res.setHeader('Content-Type','application/json')
             return res.status(400).json('errr')
         }
        let value=0
        let productsOFS=[] //pructos fuera de stock
        for(let product of cart[0].products){
            //console.log(product.product)
            if(product.product.stock<product.quantity){//si el stock es menor a la cantidad solicitada
                    let productOfs={//guardo el _id del producto y la canidad.
                        product:product.product._id,
                        quantity:product.quantity
                    }
                    productsOFS.push(productOfs)//guardo el producto en el array.
                    continue//sigo con el próximo.
                }
            let price=0
            price=product.product.price*product.quantity
            value=value+price
            //update stock
            productService.updateProduct('stock',product.product.stock-product.quantity,product.product.id)
        }
        //FALTA ACTUALIZAR STOCK
        let ticket=await ticketManager.createTicket(value,purchaser)
        //console.log(ticket)
        await ticketModel.create(ticket)
        //update carrito
        await CartManager.updateCart(productsOFS,cId)
        //envio ticket por email.
        mailing.send(ticket)
    }

}

module.exports=CartController