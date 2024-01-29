const cartModel=require('../dao/models/carts.model.js')
class CartManager{

    constructor(path){
        this.path=path
        this.id=0
    }

    static async getCarts(){
        let carts=[]
        try {
            carts=await cartModel.find({}).populate('products.product')
            
        } catch (error) {
            console.log(error.message)
        }
        return carts
    }


    static async getCartById(id){
        let cart=await cartModel.find({id:id}).populate('products.product')
        if(!cart){
            console.error('No exiset carrito con id')
            return
        }
        return cart
    }

    static async addCart(products){
        let id= await cartModel.find().sort({$natural:-1}).limit(1).lean()
        id=id[0].id+1
        cartModel.insert
        let cart={
            id:id,
            products:products
        }
        return cart
        //await productModel.create(product.product)
    }

    static async addProductToCart(productP,id){
        //recibo _id del producto. y el id del carrito.

        let cart=await this.getCartById(id)
        if(cart.length!==0){
            let productsOnCart=cart[0].products//guardo los productos del carrito existente.
            let existe=productsOnCart.find(producto=>producto._id===productP)??-1//busco si existe el producto, si no existe devuelvo -1
            productsOnCart.forEach(async(product)=>{
                //BUSCO EL PRODUCTO EN EL CARRITO Y SI EXISTE ACTUALIZO LA CANTIDAD                
                if((product.product).toString()===productP){
                    product.product=productP
                    product.quantity=product.quantity+1//sumo las cantidades
                    await cartModel.updateOne({id:id},{$set:{//actualizo el producto.
                    id:id,
                    products:productsOnCart
                        }})
                    return
                }
            })
            if(existe===-1){//Si no existe el producto en el carrito, lo agrego.
                let newProduct={
                    product:productP,
                    quantity:1
                }
                productsOnCart.push(newProduct)
                await cartModel.updateOne({id:id},{$set:{
                    id:id,
                    products:productsOnCart
                       }})
                    return
                }else{
                    console.log('Carrio actualizado en FE');
                    return
                }
            }else{
                console.log(`No existe carrito con id ${id}`);
                return
            }    
    }
}
module.exports=CartManager