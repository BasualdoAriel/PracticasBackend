const messageModel=require('../../dao/models/messages.model')


const verificarUsuario=async(user)=>{
    let exist=await messageModel.find({user:user})
    if(exist.length!==0){
        return true
    }else{
        return false
    }
}

const guardarMensaje= async (datos)=>{
    let existe= await verificarUsuario(datos.user)
    if(existe){
        let lastMessage= await messageModel.find({user:datos.user}).lean()
        lastMessage=lastMessage[0].message
        await messageModel.updateOne({user:datos.user},{$set:{
            user:datos.user,
            message:datos.message,        
            },
        })
    }else{
        await messageModel.create(datos)
    }
}

module.exports=guardarMensaje