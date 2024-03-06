const nodemailer=require('nodemailer')
const config=require('./config/config.js')

const transport=nodemailer.createTransport(
    {
        service:'gmail',
        port:587,
        auth:{
            user:config.EMAIL,
            pass:config.PASS
        }
    }
)

const send=(ticket)=>{
    console.log(ticket)
    return transport.sendMail(
        {
            from:config.EMAIL,
            to:config.EMAIL_TEST,
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

const recovery=(message)=>{
    console.log('ingres recuper');

    return transport.sendMail(
        {
            from:config.EMAIL,
            to:config.EMAIL_TEST,
            subject:'test',
            html:`${message}`
        }
    )
}

module.exports={send,recovery}