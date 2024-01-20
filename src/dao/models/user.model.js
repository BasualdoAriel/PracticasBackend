const mongoose=require('mongoose')

const usersCollection='users'

const usersEsquema=new mongoose.Schema(
    {
        first_name: String,
        last_name:String,
        email: {
            type: String, unique: true
        },
        age:Number,
        password: String,
        cart:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"carts"
        },
        role:{
            type:String,
            default:"user"
        }
    },
    {
        strict:false,
        timestamps: {
            updatedAt: "FechaUltMod", createdAt: "FechaAlta"
        }
    }
)

const usersModel=mongoose.model(usersCollection, usersEsquema)

module.exports=usersModel