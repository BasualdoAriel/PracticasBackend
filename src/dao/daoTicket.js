const crypto=require('crypto')

class ticketDao{
    constructor(){}

    static createTicket(value,purchaser){
        let code=crypto.randomUUID().substring(0,10).toString()//creo cadena aleaoria con cypto

        let ticket={
            code: code, //crea um string aleatorio de 10 caracteres.
            amount:value,
            purchaser:purchaser
        }
        return ticket
    }


}

module.exports=ticketDao