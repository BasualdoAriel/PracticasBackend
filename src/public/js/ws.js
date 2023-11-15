const socket=io()

let listaUp=document.getElementById('listaUp')
let update=document.getElementById('add')
let deleteLast= document.getElementById('delete')
let contador=0

console.log(update)

update.addEventListener("click",()=>{
    contador=contador+1
    let product=document.createElement("li")
    product.setAttribute("id",`added${contador}`)
    let title=document.getElementById('title').value
    product.innerHTML=title
    listaUp.append(product)
})

deleteLast.addEventListener("click",()=>{
    if(contador>0){
        let ultimoAd=document.getElementById(`added${contador}`)
        listaUp.removeChild(ultimoAd)
        contador=contador-1
    }
})