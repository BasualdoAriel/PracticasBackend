const mongoose=require('mongoose')

const cartsCollection='carts'

const cartEsquema=new mongoose.Schema(
    {
        id:Number,
        products:Array
    },
    {
        timestamps:true
    }
)

const cartModel=mongoose.model(cartsCollection,cartEsquema)

module.exports=cartModel