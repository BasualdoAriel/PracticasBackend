const errorHandler=(error,req,res,next)=>{
    console.log('hola');
    if(error){
        if(error.code){
            console.log('hola')
            console.log(`Error codigo: ${error.code} - ${error.name}`);
            res.setHeader('Content-Type','application/json')
            return res.status(error.status).json({error:`${error.name}:${error.description}`})
        }else{

            res.setHeader('Content-Type','application/json')
            res.status(500).json('Error inesperado, contacte a un admin.')
        }
    }
    next()
}

module.exports=errorHandler