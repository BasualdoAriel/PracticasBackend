//const fs=require('fs')
const cartModel=require('./models/carts.model.js')
class CartManager{

    constructor(path){
        this.path=path
        this.id=0
    }

    async getCarts(){
        let carts=[]
        try {
            carts=await cartModel.find({})
        } catch (error) {
            console.log(error.message)
        }
        return carts
    }


    async getCartById(id){
        let cart=await cartModel.find({id:id})
        if(!cart){
            console.error('No exiset carrito con id')
            return
        }
        return cart
    }

    async addCart(products){
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

    async addProductToCart(product,id){
        let cart=await this.getCartById(id)
        if(cart.length!==0){
            let productsOnCart=cart[0].products//guardo los productos del carrito existente.
            let productId=product[0].product//guardo el id del producto a agregar.
            let productQuantity=product[0].quantity//guardo la cantidad del produco a agregar.
            let existe=productsOnCart.find(producto=>producto.product===productId)??-1//busco si existe el producto, si no existe devuelvo -1
            productsOnCart.forEach(async(product)=>{
                //BUSCO EL PRODUCTO EN EL CARRITO Y SI EXISTE ACTUALIZO LA CANTIDAD
                if(product.product===productId){
                    product.quantity=product.quantity+productQuantity//sumo las cantidades
                    await cartModel.updateOne({id:id},{$set:{//actualizo el producto.
                    id:id,
                    products:productsOnCart
                        }})
                }
            })
            if(existe===-1){//Si no existe el producto en el carrito, lo agrego.
                productsOnCart.push(product[0])
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


    /*async getCarts(){
        if(fs.existsSync(this.path)){
            let carts=JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            return carts
        }else{
            return []
        }
    }

    async getCartbyId(id){
        let carts=await this.getCarts()
        let cart= carts.find(c=>(c.id===id))
        if(!cart){
            console.error('No se encuentra id')
            return 
        }
        return cart;
    }

    async addCart(products){
        //El ejercicio no pide validar si el producto está generado correctamente.
        let carts= await this.getCarts()
        let cart={
            id:0,
            products:products
        }
        this.id=carts[carts.length-1].id
        let cartId=this.id+1
        cart.id=cartId
        carts.push(cart)
        fs.promises.writeFile(this.path,JSON.stringify(carts,null,5))
    }

    async addProductToCart(product, id){
        //product contiene id de producto y cantidad
        let carts= await this.getCarts()//guard todos ls carts
        let cart= await this.getCartbyId(id)//Si existe, teng el carrit cn el id
        let productValues=Object.values(product)
        let productId=productValues[0].product //guardo el id del producto
        let productQuantity=productValues[0].quantity //guardo la cantidad de productos.

        if(cart===undefined){//si no existe o es undefined retorn error
            return console.log(`no existe cart con id ${id}`)
        }
        if(cart.products.length===0){//si products no tiene nada, agrego el prductto recibido pro parametro.
            cart.products.push(product[0])//agregar el product porque el carrito no tiene ninguno.
            let newCarts=carts.filter(c=>c.id!=id)//guard en auxiliar los carrits.
            fs.unlinkSync(this.path)//elimino la ruta
            newCarts.push(cart)//push del carrito actualizado.
            newCarts.sort((id1,id2)=>id1.id-id2.id)//ordeno el carrito por id.
            fs.promises.writeFile(this.path,JSON.stringify(newCarts,null,5))//guardo los cambios.
            return
        }
        if(cart.products){
            let exist=cart.products.find(p=>(p.product===productId))//busco si existe el producto en el carrito
            if(exist && cart.products.length>0){
                let arrayProducts=Object.entries(cart.products) //guardo los productos del carrito.
                let updatedProducts=[] //Inicilizo un array para guardar los productos nuevos.
                arrayProducts.forEach((item)=>{//busco el id del producto y actualizo la cantidad.
                    if(item[1].product===productId){
                        item[1].quantity=item[1].quantity+productQuantity//encuentro el prducto y actualizo la cantidad.
                    }
                    updatedProducts.push(item[1])//actualizo array de productos nuevos.
                })
                cart.products=updatedProducts
                let newCarts=carts.filter(c=>c.id!=id)
                //guardo los carritos que no se utilizan.
                fs.unlinkSync(this.path)//elimino la ruta
                newCarts.push(cart)//push del carrito actualizado.
                newCarts.sort((id1,id2)=>id1.id-id2.id)//ordeno carrit por id
                fs.promises.writeFile(this.path,JSON.stringify(newCarts,null,5))//guardo los cambios.
                return
            }else{
                let auxProducto={
                    product:productValues[0].product,
                    quantity:productValues[0].quantity
                }//creo el producto
                cart.products.push(auxProducto)//push al cart
                let newCarts=carts.filter(c=>c.id!=id)
                //guardo los carritos que no se utilizan.
                fs.unlinkSync(this.path)//elimino la ruta
                newCarts.push(cart)//push del carrito actualizado.
                newCarts.sort((id1,id2)=>id1.id-id2.id)//Ordeno carrito por id.
                fs.promises.writeFile(this.path,JSON.stringify(newCarts,null,5))//guardo los cambios.
                return
            }
        }
    }*/
}





module.exports=CartManager