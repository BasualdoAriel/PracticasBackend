const productModel=require('./models/products.model.js')

class productDao{
    constructor(){}

    static async createProduct(title,description,code,price,status,stock,category,thumbnail){//crea el producto y lo devuelve.
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

    static async updateProduct(param, value,id){
        let product= await productModel.find({id:id}).lean()
        let params=["id","title","description","code","price","status","stock","category","thumbnail"]
        if (product.length===0){// si no encuentro product, devuelvo -1
            return -1
        }
        if(!params.includes(param)){//si el paramero no es valido devuelvo 0
            return 0
        }
        const updateProduct={$set:{}}
        updateProduct.$set[param]=value
        await productModel.updateOne({id:id},updateProduct)
        return product//devuelvo el producto actualizado
    }


}

module.exports=productDao