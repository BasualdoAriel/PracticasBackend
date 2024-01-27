const path=require('path')
const dotenv=require('dotenv')

const {Command}=require('commander')

const program=new Command()

program
    .option('-m, --mode <mode>', 'modo de ejecuciòn (prod/dev)','dev')

program.parse()

let opts=program.opts()
let allowedModes=['prod','dev']

if(!allowedModes.includes(opts.mode.toLowerCase())){
    console.log('Solo se permiten los modos "dev" y "prod"')
    process.exit()
}


const envPath=path.join(__dirname,'../.env')

dotenv.config({path:envPath})

const configServer={
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
    DB_NAME:process.env.DB_NAME,
    MONGO_URL:process.env.MONGO_URL,
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    CALLBACK_URL:process.env.CALLBACK_URL
}

module.exports=configServer