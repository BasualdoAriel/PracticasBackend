const {Router}=require('express')
const usersModel= require('../dao/models/user.model')
const router=Router()
const crypto=require('crypto')


router.post('/login', async(req,res)=>{
    let {email,password}=req.body
    if(!email||!password){//si no exise email o password, solicito nuevamente
        return res.redirect('/login?error=Complete los datos')
    }

    password=crypto.createHmac('sha256','ArielBasualdo').update(password).digest('hex')//encripto la clave.
    let user=await usersModel.findOne({email,password})//busco si existe el usuario
    if(!user){//si no existe, solicito nuevamene datos.
        return res.redirect(`/login?error=acceso incorrecto`)
    }

    req.session.user={//creo el usuario 
        name:user.name, email:user.email, role:user.role
    }

    return res.redirect('/home')
})


router.post('/register',async (req,res)=>{
    let {name,email,password}=req.body

    if(!name||!email||!password){
        return res.redirect('/register?error=Completá todos los campos!')
    }

    let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    console.log(regMail.test(email))
    if(!regMail.test(email)){
        return res.redirect('/register?error=Mail con formato incorrecto...!!!')
    }

    let exist=await usersModel.findOne({email})
    if(exist){
        return res.redirect(`/register?error=Email: ${email} ya está regisrado.`)
    }

    password=crypto.createHmac('sha256','ArielBasualdo').update(password).digest('hex')
    let user

    try {
        user=await usersModel.create({name,email,password})
        return res.redirect(`/login?mensaje=Email ${email} regisrtado correctamente.`)
    } catch (error) {
        return res.redirect('/register?error=error inespesrado. Reintente')
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(error=>{//desruyo la sesión
        if(error){
            return res.redirect('/login?error=Fallo en logout')
        }
    })

    res.redirect('/login')
})


module.exports=router