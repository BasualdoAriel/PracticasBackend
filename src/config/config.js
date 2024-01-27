const path=require('path')
const dotenv=require('dotenv')

const envPath=path.join(__dirname,'../.env')

dotenv.config({path:envPath})

const config={
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
    DB_NAME:process.env.DB_NAME,
    MONGO_URL:process.env.MONGO_URL
}

module.exports=config