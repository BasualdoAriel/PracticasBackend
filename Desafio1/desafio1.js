class ProductManager{

    constructor(){
        this.products=[]
        this.id=0
    }

    createProduct(title,description,price,thumbnail,code,stock){
        let newProduct={
            id:0,title, description,price,thumbnail,code,stock
        }
        return newProduct
    }

    addProduct(product){
        let productId=this.id+1
        let exists= this.products.find(p=>(p.code===product.code))
        let fields=Object.values(product)
        if(exists){
            console.log(`====================================
existe un producto con el mismo código: ${product.code}` )
            return
        }
        if(fields.includes(undefined)){
            console.log(`====================================
El producto ${product.title} no tiene la cantidad de campos obligatorios (6)`)
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
//Creo producto
let producto1= productManager.createProduct('celular', 'teléfono celular',80,'thumbnail/src','a4sd1',20);
let producto2= productManager.createProduct('tablet', 'tablet',10,'thumbnail/src','155asf',25)
let producto3= productManager.createProduct('mouse', 'raton',55,'thumbnail/src','a4sd1',80)
let producto4= productManager.createProduct('monitor', 'monitor pc',60,'thumbnail/src','sdfghh555',30)
let producto5= productManager.createProduct('tecladp', 'teclado pc',60,'thumbnail/src','444')
let producto6= productManager.createProduct('speaker', 'parlante pc',60,'thumbnail/src','',56)
let producto7= productManager.createProduct('joystick', 'joystick pc',60,'thumbnail/src','',56)
let producto8= productManager.createProduct('Motherboard', 'mother pc',70,'thumbnail/src','gg4sdfg55',10)
let producto9= productManager.createProduct('GPU', 'GPU pc',90,'thumbnail/src','g8s1b1b',1)
let producto10= productManager.createProduct('RAM', 'ram pc',60,'thumbnail/src','ramasfdf',)

//Agrego productos.
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.addProduct(producto4);
productManager.addProduct(producto5);
productManager.addProduct(producto6);
productManager.addProduct(producto7);
productManager.addProduct(producto8);
productManager.addProduct(producto9);
productManager.addProduct(producto10);

//log de productos.
console.table(productManager.getProduct())

//Busco producto por id
let productId0=productManager.getProductByI(3);
let productId1=productManager.getProductByI(1);
let productId2=productManager.getProductByI(0);
let productId3=productManager.getProductByI(5);


