class Product{
    constructor(){
        this.product
    }

    createProduct(title,description,code,price,status,stock,category,thumbnail){//crea el producto y lo devuelve.
        let newProduct={
            id:0,title,description,code,price,status,stock,category,thumbnail
        }
        this.product=newProduct
        return this.product
    }
}
module.exports=Product