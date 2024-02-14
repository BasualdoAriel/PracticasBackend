
class Errors{

    static noAutorizado=()=>{
        return `
        El usuario, no posee los permisos para ingrsear en esta sección del sitio.
        Contactar a un adminsitrador.
        `
    }



    static errorParams=(param)=>{
        
        return `
        Error en argumentos,
        params permitidos:
            -id
            -title
            -description
            -code
            -price
            -status
            -stock
            -category
            -thumbnail 
        el param: ${param} no es válido.
        `
    }
}



module.exports=Errors