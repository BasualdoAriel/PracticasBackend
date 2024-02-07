const productModel=require('./models/products.model.js')

class productManagerDao{
    constructor(){}

    static async getProducts(){//Obtiene el array de productos, corrobora si existe y sino devuelve un array vacío para que se inicialice
        let products=[]
        try {
            products=await productModel.find({})
        } catch (error) {
            console.log(error.message)
        }
        return products
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
    
    static async updateProduct(id){
        
    }
}

module.exports=productManagerDao