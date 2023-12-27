const mongoose=require('mongoose')

const usersCollection='users'

const usersEsquema=new mongoose.Schema(
    {
        name: String,
        email: {
            type: String, unique: true
        },
        password: String,
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