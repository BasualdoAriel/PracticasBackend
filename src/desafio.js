const fs=require('fs')
const express=require('express')

const app= express()

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

class ProductManager{

    constructor(path){
        this.id=0
        this.path=path
    }

    getProducts(){//Obtiene el array de productos, corrobora si existe y sino devuelve un array vacío para que se inicialice
        if(fs.existsSync(this.path)){
            let products=JSON.parse(fs.readFileSync(this.path,"utf-8"))
            return products
        }else{
            return []
        }
    }

    addProduct(product){//agrega productos que cumplan con los campos obligatorios y que no estén repetidos. Por último graba el archivo 
        let products=this.getProducts()
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
        fs.writeFileSync(this.path,JSON.stringify(products,null,5))
    }

    getProductById(id){ //desde un id recibido por parametro, devuelve el producto correspondiente al mismo si existe.
        let products=this.getProducts()
        let product= products.find(p=>(p.id===id))
        if(!product){
            console.error('No se encuentra id')
            return
        }
        return product;
    }

    updateProduct(id,productUpdated){//actualiza el producto asociadio al id que recibe por parametro y vuelve a guardar el archivo.
        let read=JSON.parse(fs.readFileSync(this.path,"utf-8")) //obtengo array de objetos desde archivo.
        let product= read.find(p=>(p.id===id))//obtengo objeto desde el array anterior.
        if(product){
            let auxId=product.id
            read[id]=productUpdated
            read[id].id=auxId
            fs.unlinkSync(this.path)
            fs.writeFileSync(this.path,JSON.stringify(read,null,5))
            console.log('Archivo actuailizado.')
            return           

        }else{
            console.log('Not Found or invalid id')
            return
        }
    }

    deleteProduct(id){//Elimina el producto correspondiente al id reecibido por parametro.
        let read=JSON.parse(fs.readFileSync(this.path,"utf-8"))
        let exist= read.find(p=>(p.id===id))
        if(exist){
            read.splice(id,1)
            fs.unlinkSync(this.path)
            fs.writeFileSync(this.path,JSON.stringify(read,null,5))
        }else{
            console.log('No existe producto con ese id')
            return
        }
    }

}

//Pruebas
//Inicializo manager
const productManager= new ProductManager("../ProductManager/productos.json")

//Creo productos
let producto1=  new Product()
let producto2=  new Product()
let producto3=  new Product()
let producto4=  new Product()
let producto5=  new Product()
let producto6=  new Product()
let producto7=  new Product()
let producto8=  new Product()
let producto9=  new Product()
let producto10= new Product()
let producto11= new Product()
let producto12= new Product()
let producto13= new Product()

producto1.createProduct('celular', 'teléfono celular',80,'thumbnail/src','a4sd1',20)
producto2.createProduct('tablet', 'tablet',10,'thumbnail/src','155asf',25)
producto3.createProduct('mouse', 'raton',55,'thumbnail/src','a4sd1',80)
producto4.createProduct('monitor', 'monitor pc',60,'thumbnail/src','sdfghh555',30)
producto5.createProduct('tecladp', 'teclado pc',60,'thumbnail/src','444')
producto6.createProduct('speaker', 'parlante pc',60,'thumbnail/src','546456',56)
producto7.createProduct('joystick', 'joystick pc',60,'thumbnail/src','546456',56)
producto8.createProduct('Motherboard', 'mother pc',70,'thumbnail/src','gg4sdfg55',10)
producto9.createProduct('GPU', 'GPU pc',90,'thumbnail/src','g8s1b1b',1)
producto10.createProduct('RAM', 'ram pc',60,'thumbnail/src','ramasfdf',)
producto11.createProduct('notebook','notebook',13,'thumb','klsdafj1123',10)

//Agrego productos.
productManager.addProduct(producto1.product);
productManager.addProduct(producto2.product);
productManager.addProduct(producto3.product);
productManager.addProduct(producto4.product);
productManager.addProduct(producto5.product);
productManager.addProduct(producto6.product);
productManager.addProduct(producto7.product);
productManager.addProduct(producto8.product);
productManager.addProduct(producto9.product);
productManager.addProduct(producto10.product);
productManager.addProduct(producto11.product);

//log de productos.
//console.log(productManager.getProducts())

//Busco producto por id
let productId0=productManager.getProductById(3);
let productId1=productManager.getProductById(1);
let productId2=productManager.getProductById(0); //not fund
let productId3=productManager.getProductById(5);
let productId4=productManager.getProductById(10)//not fund
let productId5=productManager.getProductById(7)

//Creo productos y realizo update
producto12.createProduct('auricular','auricular',20,'thumb','jaksfdjl525',30)
producto13.createProduct('fuente','fuente pc',32,'thumb','ajsdfg33qw',56)
setTimeout(()=>{
    productManager.updateProduct(0,producto12.product)

},5000)
setTimeout(()=>{
    productManager.updateProduct(1,producto13.product)

},5000)

//Elimino productos por id
setTimeout(()=>{
    productManager.deleteProduct(4)
    productManager.deleteProduct(10)
    productManager.deleteProduct(0)
},8000)


//leo por ultima vez los productos, busco por id un producto y elimino el archivo. Si vuelvo a ejecutar sin eliminar el archivo el programa agrega productos erronamente.
setTimeout(()=>{
    console.table(productManager.getProducts())
    console.log(productManager.getProductById(1))
    fs.unlinkSync("./ProductManager/productos.json")
    console.log('Elimino archivo.')
},10000)


