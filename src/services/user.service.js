const daoUser=require('../dao/daoUser.js')

class User{
    constructor(){}

    static async getPremium(email,role){
        return await daoUser.getPremium(email,role)
    }

    static async sendRecovery(email){
        return await daoUser.sendRecovery(email)
    }

}

module.exports=User