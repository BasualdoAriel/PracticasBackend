const CartManager=require('../services/cartManager.service.js')
const cartModel=require('../dao/models/carts.model.js')

class CartController{
    constructor(){}

    static async getCarts(req,res){
        let carts=await CartManager.getCarts()
        res.setHeader('Content-Type','application/json')
        res.status(200).json({carts})
    }

    static async getCartById(req,res){
        let id=parseInt(req.params.id)
        let cart=await CartManager.getCartById(id)
        if(cart.length===0){
            res.setHeader('Content-Type','application/json')
            return res.status(404).json({error:`No existe cart con id ${id}`})
        }
        res.setHeader('Content-Type','application/json')
        res.status(200).json(cart)
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
        console.log('enro');
        let pId=parseInt(req.params.pId)
        let cId=parseInt(req.params.cId)
        let product= await productManager.getProductById(pId)
        let exist= await CartManager.getCartById(cId)
        
        if(exist===undefined || Object.keys(product).length===0){
            res.setHeader('Content-Type','application/json')
            return res.status(400).json('errr')
        }
        product=(product[0]._id).toString()
        CartManager.addProductToCart(product,cId)
        res.setHeader('Content-Type','application/json')
        res.status(200).json(`Se actualizó el carrito.`)
    }
}

module.exports=CartController