

class ProductManager{

    constructor(){
        this.products=[]
    }

    createProduct(name,description,price,thumbnail,code,stock){
        let newProduct={
            name, description,price,thumbnail,code,stock
        }
        return newProduct
    }

    addProduct(product){
        let exists= this.products.find(p=>(p.code===product.code))
        if(exists){
            console.log(`existe un producto con el mismo código: ${product.code}`)
            return
        }
        this.products.push(product)
    }

    getProduct(){
        return this.products
    }

}

const productManager= new ProductManager()
let producto1= productManager.createProduct('celu', 'teléfono celular',80,'thimbnail/src','a4sd1',20);
let producto2= productManager.createProduct('tablet', 'tablet',10,'thimbnail/src','155asf',25)
let producto3= productManager.createProduct('mouse', 'raton',55,'thimbnail/src','a4sd1',80)
let producto4= productManager.createProduct('monitor', 'monitor pc',60,'thimbnail/src','sdfghh555',30)

//console.log(producto1)
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.addProduct(producto4);
console.table(productManager.getProduct())
