const fakerEs=require('@faker-js/faker')
const faker=fakerEs.fakerES_MX


const mocking=()=>{
    let mockingProducts=[]

    for (let i = 0; i < 100; i++) {
        let product={
            _id:faker.string.alphanumeric(20),
            id:i,
            title:faker.commerce.product(),
            description:faker.commerce.productDescription(),
            code:faker.string.alphanumeric(8),
            price:faker.commerce.price({min:90,symbol:'$'}),
            status:false,
            stock:parseInt(Math.random()*(20-1)+1),
            category:faker.commerce.department(),
            thumbnail:faker.image.url(),
            updatedAt:faker.date.recent({days:10})
        }
        mockingProducts.push(product)
    }
    console.log(mockingProducts.length)
    return mockingProducts
}

module.exports=mocking