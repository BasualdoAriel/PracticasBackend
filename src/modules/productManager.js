const fs=require('fs')




class ProductManager{

    constructor(path){
        this.id=0
        this.path=path
    }

    async getProducts(){//Obtiene el array de productos, corrobora si existe y sino devuelve un array vacío para que se inicialice
        if(fs.existsSync(this.path)){
            let products=JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
            return products
        }else{
            return []
        }
    }

    async addProduct(product){//agrega productos que cumplan con los campos obligatorios y que no estén repetidos. Por último graba el archivo 
        let products=await this.getProducts()
        let exists=products.find(p=>(p.code===product.code))
        let fields=Object.values(product)
        if(exists || fields.includes(undefined)){
            console.log(`====================================
existe un producto con el mismo código: ${product.code} o alguno de los campos no está completo` )
            return
        }
        let productId=this.id
        product.id=productId
        this.id++
        products.push(product)
        console.log(products)
        fs.promises.writeFile(this.path,JSON.stringify(products,null,5))
    }

    async getProductById(id){ //desde un id recibido por parametro, devuelve el producto correspondiente al mismo si existe.
        let products=await this.getProducts()
        let product= products.find(p=>(p.id===id))
        if(!product){
            console.error('No se encuentra id')
            return
        }
        return product;
    }

    async updateProduct(id,productUpdated){//actualiza el producto asociadio al id que recibe por parametro y vuelve a guardar el archivo.
        let read=JSON.parse(await fs.promises.readFile(this.path,"utf-8")) //obtengo array de objetos desde archivo.
        let product= read.find(p=>(p.id===id))//obtengo objeto desde el array anterior.
        if(product){
            let auxId=product.id
            read[id]=productUpdated
            read[id].id=auxId
            fs.unlinkSync(this.path)
            fs.promises.writeFileSync(this.path,JSON.stringify(read,null,5))
            console.log('Archivo actuailizado.')
            return           

        }else{
            console.log('Not Found or invalid id')
            return
        }
    }

    async deleteProduct(id){//Elimina el producto correspondiente al id reecibido por parametro.
        let read=JSON.parse(await fs.promises.readFile(this.path,"utf-8"))
        let exist= read.find(p=>(p.id===id))
        if(exist){
            read.splice(id,1)
            fs.unlinkSync(this.path)
            fs.promises.writeFileSync(this.path,JSON.stringify(read,null,5))
        }else{
            console.log('No existe producto con ese id')
            return
        }
    }

}

module.exports=ProductManager