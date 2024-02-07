const mongoose=require('mongoose')

const ticketsCollection='tickets'

const ticketEsquema=new mongoose.Schema(
    {
        code:{
            type:String,
            unique:true
        },
        amount:Number,
        purchaser:String
    },
    {
        timestamps:{
            createdAt:"purchase_datetime"
        }
    }
)

const ticketModel=mongoose.model(ticketsCollection,ticketEsquema)

module.exports=ticketModel