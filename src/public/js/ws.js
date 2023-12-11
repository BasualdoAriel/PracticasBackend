const socket=io()

const listaUp=document.getElementById('listaUp')
const submitButton=document.getElementById('submit')
const deleteLast=document.getElementById('delete')
let contador=0

submitButton.addEventListener("click",()=>{
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