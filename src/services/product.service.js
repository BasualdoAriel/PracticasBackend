const daoProduct=require('../dao/daoProducts.js')

class Product{
    constructor(){}

    async createProduct(title,description,code,price,status,stock,category,thumbnail){//crea el producto y lo devuelve.
        return await daoProduct.createProduct(title,description,code,price,status,stock,category,thumbnail)
    }

    async updateProduct(param, value,id){
        return await daoProduct.updateProduct(param, value,id)
    }

}
module.exports=Product