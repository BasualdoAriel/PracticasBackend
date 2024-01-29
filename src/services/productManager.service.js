const productModel=require('../dao/models/products.model.js')

class ProductManager{

    constructor(path){
        this.id=0
        this.path=path
    }

    static async getProducts(){//Obtiene el array de productos, corrobora si existe y sino devuelve un array vacío para que se inicialice
        let products=[]
        try {
            products=await productModel.find({})
        } catch (error) {
            console.log(error.message)
        }
    }

    static async getProductById(id){
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