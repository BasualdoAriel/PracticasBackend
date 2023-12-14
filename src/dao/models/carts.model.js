const mongoose=require('mongoose')

const cartsCollection='carts'

const cartEsquema=new mongoose.Schema(
    {
        id:Number,
        products:{
            type:[
                {
                    product:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"products"
                    },
                    quantity:Number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                }
            ]
        }
    },
    {
        timestamps:true
    }
)

const cartModel=mongoose.model(cartsCollection,cartEsquema)

module.exports=cartModel