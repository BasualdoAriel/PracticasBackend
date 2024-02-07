const ticketDao=require('../dao/daoTicket.js')

class ticket{
    constructor(){}

    static async createTicket(value,purchaser){
        return await ticketDao.createTicket(value,purchaser)
    }

}

module.exports=ticket