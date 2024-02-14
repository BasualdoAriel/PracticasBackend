

class CustomError{
    static CustomError({name,message,statusCode,code,description}){
        const error= new Error(message,{description})
        error.name=name
        error.statutsCode=statusCode
        error.code=code
        error.description=description
        throw error
    }

}

module.exports=CustomError