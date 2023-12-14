const productModel=require('../models/products.model')

class ProductManager{

    constructor(path){
        this.id=0
        this.path=path
    }

    async getProducts(){//Obtiene el array de productos, corrobora si existe y sino devuelve un array vacío para que se inicialice
        let products=[]
        try {
            products=await productModel.find({})
        } catch (error) {
            console.log(error.message)
        }
    }

    async getProductById(id){
        let product
        try {
            product=await productModel.find({id:id})
            return product
        } catch (error) {
            return {}
        }
    }
}

module.exports=ProductManager