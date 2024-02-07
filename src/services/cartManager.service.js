const daoCart=require('./../dao/daoCart.js')

class CartManager{

    constructor(){}

    static async getCarts(){
        return await daoCart.getCarts()
    }

    static async getCartById(id){
        return await daoCart.getCartById(id)
    }

    static async addCart(products){
        return await daoCart.addCart(products)
    }

    static async addProductToCart(productP,id){
        return await daoCart.addProductToCart(productP,id)
    }

    static async updateCart(products,id){
        return await daoCart.updateCart(products,id)
    }
}
module.exports=CartManager