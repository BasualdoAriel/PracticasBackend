const mongoose=require('mongoose')
const paginate=require('mongoose-paginate-v2')

const productsColeccion='products'

const productsEsquema=new mongoose.Schema(
    {
        id:{
            type:Number,
            index:true
        },
        title: String,
        description: String,
        code: String,
        price:Number,
        status:{
            type:Boolean, default:true
        },
        stock:Number,
        category:{
            type:String,
            index:true
        },
        thumbnail: String
    },
    {
        timestamps:true
    }
)

productsEsquema.plugin(paginate)

const productModel=mongoose.model(productsColeccion, productsEsquema)

module.exports= productModel
