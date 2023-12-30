const {Router}=require('express')
// const usersModel= require('../dao/models/user.model')
// const crypto = require('../crypto.js') //importo implementación de bcrypt
const router=Router()
const passport=require('passport')

router.get('/ErrorLogin',(req,res)=>{
    return res.redirect(`/login?error=acceso incorrecto`)
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/sessions/ErrorLogin'}) ,async(req,res)=>{
    req.session.user={//creo el usuario 
        name:req.user.name, email:req.user.email, role:req.user.role
    }
    return res.redirect('/home')
})

router.get('/errorRegistro',(req,res)=>{
    return res.redirect('/register?error=error en proceso de registro!')
})


router.post('/register', passport.authenticate('register',{failureRedirect:'/sessions/errorRegistro'}), async (req,res)=>{
    let {email}=req.body
    //logica del regisro en config.passport
    return res.redirect(`/login?mensaje=Email ${email} regisrtado correctamente.`)

})

router.get('/logout',(req,res)=>{
    req.session.destroy(error=>{//desruyo la sesión
        if(error){
            return res.redirect('/login?error=Fallo en logout')
        }
    })

    res.redirect('/login')
})

router.get('/github',passport.authenticate('github',{}),(req,res)=>{

})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:'/sessions/ErrorGithub'}), (req,res)=>{
    // res.status(200).json({
    //     message: 'Acceso correcto: ', usuario:req.user._json.email
    // })
    req.session.user={//creo el usuario 
        name:req.user.name, email:req.user.email, role:req.user.role
    }
    return res.redirect('/home')
})

router.get('/ErrorGithub', (req,res)=>{
    return res.redirect(`/login?error=Login con GitHub erroneo`)
})

module.exports=router