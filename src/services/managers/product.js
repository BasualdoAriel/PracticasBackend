const productModel=require('../../dao/models/products.model')

class Product{
    constructor(){
        this.product
    }

    async createProduct(title,description,code,price,status,stock,category,thumbnail){//crea el producto y lo devuelve.
        let id= await productModel.find().sort({$natural:-1}).limit(1).lean() //accedo al último registro.
        id=id[0].id+1 //Obtengo el id del último registro y le sumo 1
        let notExists= await productModel.find({code:code}).lean()
        if(notExists.length===0){     
            let newProduct={
                id:id,title,description,code,price,status,stock,category,thumbnail
            }
            this.product=newProduct
            return this.product
        }
        this.product={}
            return this.product
    }

    async updateProduct(id,title,description,code,price,status,stock,category,thumbnail){
        let product= await productModel.find({id:id}).lean()
        if (product.length===0){// si no encuentro product, devuelvo objet vacio
            return product
        }
        await productModel.updateOne({id:id},{$set:{//actualizo el producto.
            "id":id,// mantengo el id.
            "title":title,
            "description":description,
            "code":code,
            "price":price,
            "status":status,
            "stock":stock,
            "category":category,
            "thumbnail":thumbnail
        }})
        return product//devuelvo el producto actualizado
    }

}
module.exports=Product