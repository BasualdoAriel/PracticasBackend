const mongoose=require('mongoose')

const messagesCollection='messages'

const messagesEsquema=new mongoose.Schema(
    {
        user:{
            type:String,
            sparse:true
        },
        message:String
    },
    {
        timestamps:true
    }

)

const messageModel=mongoose.model(messagesCollection,messagesEsquema)

module.exports=messageModel