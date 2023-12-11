const mongoose=require('mongoose')

const productsColeccion='products'

const productsEsquema=new mongoose.Schema(
    {
        id:Number,
        title: String,
        description: String,
        code: String,
        price:Number,
        status:{
            type:Boolean, default:true
        },
        stock:Number,
        category: String,
        thumbnail: String
    },
    {
        timestamps:true
    }
)

const productModel=mongoose.model(productsColeccion, productsEsquema)

module.exports= productModel
