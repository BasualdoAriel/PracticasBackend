class Product{
    constructor(){
        this.product
    }

    createProduct(title,description,price,thumbnail,code,stock){//crea el producto y lo devuelve.
        let newProduct={
            id:0,title, description,price,thumbnail,code,stock
        }
        this.product=newProduct
        return this.product
    }
}
module.exports=Product