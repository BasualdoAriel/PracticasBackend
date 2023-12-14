const socket=io()

//let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
let inputMensaje=document.getElementById('mensaje')
let divMensajes=document.getElementById('mensajes')

Swal.fire({
    title:"Identificate",
    input:"email",
    inputLabel:"Ingresá tu correo electrónico",
    inputPlaceholder:"ejemplo@ejemplo.com",
    allowOutsideClick:false
}).then(resultado=>{
    socket.emit('id', resultado.value)
    inputMensaje.focus()
    document.title=resultado.value


    socket.on('hello',mensajes=>{
        mensajes.forEach(mensaje=>{
            let parrafo=document.createElement('p')
            parrafo.innerHTML=`<strong>${mensaje.emisor}</strong> dice: <i>${mensaje.mensaje}</i>`
            parrafo.classList.add('mensaje')
            let br=document.createElement('br')
            divMensajes.append(parrafo, br)
            divMensajes.scrollTop=divMensajes.scrollHeight   
        })
    })

    socket.on('nuevoMensaje', datos=>{
        let parrafo=document.createElement('p')
        parrafo.innerHTML=`<strong>${datos.user}</strong> dice: <i>${datos.message}</i>`
        parrafo.classList.add('mensaje')
        let br=document.createElement('br')
        divMensajes.append(parrafo, br)
        divMensajes.scrollTop=divMensajes.scrollHeight
    })



    inputMensaje.addEventListener("keyup",(e)=>{
        if(e.code==="Enter" && e.target.value.trim().length>0){
            socket.emit('mensaje',{user:resultado.value, message:e.target.value.trim()})
            e.target.value=''
        }
    })

})