
class Product{
    constructor(){
        this.product
    }

    createProduct(title,description,price,thumbnail,code,stock){
        let newProduct={
            id:0,title, description,price,thumbnail,code,stock
        }
        this.product=newProduct
        return this.product
    }
}
class ProductManager{

    constructor(){
        this.products=[]
        this.id=0
    }

    addProduct(product){
        let productId=this.id+1
        let exists= this.products.find(p=>(p.code===product.code))
        let fields=Object.values(product)
        if(exists || fields.includes(undefined)){
            console.log(`====================================
existe un producto con el mismo código: ${product.code} o alguno de los campos no está completo` )
            return
        }   
        product.id=productId
        this.id=productId
        this.products.push(product)
    }

    getProduct(){
        return this.products
    }

    getProductByI(id){
        let product= this.products.find(p=>(p.id===id))
        if(!product){
            console.error('Not found')
            return
        }
        return product;
    }

}

//Pruebas

//Inicializo manager
const productManager= new ProductManager()

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

producto1.createProduct('celular', 'teléfono celular',80,'thumbnail/src','a4sd1',20)
producto2.createProduct('tablet', 'tablet',10,'thumbnail/src','155asf',25)
producto3.createProduct('mouse', 'raton',55,'thumbnail/src','a4sd1',80)
producto4.createProduct('monitor', 'monitor pc',60,'thumbnail/src','sdfghh555',30)
producto5.createProduct('tecladp', 'teclado pc',60,'thumbnail/src','444')
producto6.createProduct('speaker', 'parlante pc',60,'thumbnail/src','',56)
producto7.createProduct('joystick', 'joystick pc',60,'thumbnail/src','',56)
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
console.table(productManager.getProduct())

//Busco producto por id
let productId0=productManager.getProductByI(3);
let productId1=productManager.getProductByI(1);
let productId2=productManager.getProductByI(0); //not fund
let productId3=productManager.getProductByI(5);
let productId4=productManager.getProductByI(10)
let productId5=productManager.getProductByI(7)

