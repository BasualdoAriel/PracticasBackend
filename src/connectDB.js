const mongoose=require('mongoose')
const config=require('./config/config.js')

class ConnectDB{
    static #instance

    constructor(){
        mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})
    }

    static async connectDB(){
        if(this.#instance){
            console.log('Conexión ya establecida con anterioridad.');
            return this.#instance
        }
        this.#instance=new ConnectDB()
        console.log('DB Online: '+config.DB_NAME);
        return this.#instance
    }

}

module.exports=ConnectDB