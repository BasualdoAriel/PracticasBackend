const nodemailer=require('nodemailer')

const transport=nodemailer.createTransport(
    {
        service:'gmail',
        port:587,
        auth:{
            user:'arielbasualdo37@gmail.com',
            pass:'sqgapimbearxdjkh'
        }
    }
)

const send=(ticket)=>{
    console.log(ticket)
    return transport.sendMail(
        {
            from:'arielbasualdo37@gmail.com',
            to:'arielbasualdo2014@outlook.com',
            subject:'test',
            html:`
                <h3>Hola ${ticket.purchaser}!</h3>
                <p>Hola, ya realizaste la compra</p>
                <br></br>
                <p>precio: ${ticket.amount}</p>
            `
        }
    )
}

module.exports={send}