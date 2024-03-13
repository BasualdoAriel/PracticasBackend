const userModel=require('./models/user.model')
const jwt=require('jsonwebtoken')
const mailer=require('../mailer.js')

class userDao{
    constructor(){}

    static async getPremium(email, role){
        let user=userModel.findOne({email:email})
        const updateUser={$set:{}}
        if(role==='premium'){
            updateUser.$set['role']='user'
        }else{
            updateUser.$set['role']='premium'
        }
        await userModel.updateOne({email:email},updateUser)
        return user
    }

    static async sendRecovery(email){
        console.log(email)
        let user= userModel.findOne({email:email}).lean()
        //console.log('USER');
        //console.log(user);
        if(!user){
            console.log('no encontrado');
            return -1
        }
        delete user.password
        //console.log('holaA');
        let token=jwt.sign({...user.email},'secretKey',{expiresIn:'1h'})

        //console.log('hola');
        let message=`Se solicito el reseteo de clave para tu usario
        Haga click en el sigiente enlace para recuperar la clave: <a href="http://localhost:3000/sessions/recovery?token=${token}">RECOVERY</a>`

        let response= await mailer.recovery(message)

        if(response.accepted.length<0){
            return -1
        }
    }


}

module.exports=userDao