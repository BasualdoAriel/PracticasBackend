const daoProducts=require('../dao/daoProductManager.js')

class ProductManager{

    constructor(){}

    static async getProducts(){
        return await daoProducts.getProducts()
    }

    static async getProductById(id){
        return await daoProducts.getProductById(id)
    }

    static async addProductToCart(productP,id){
        return await daoProducts.addProductToCart(productP,id)
    }

}

module.exports=ProductManager