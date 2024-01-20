const {Router}=require('express')
// const usersModel= require('../dao/models/user.model')
// const crypto = require('../crypto.js') //importo implementación de bcrypt
const router=Router()
const passport=require('passport')
const UserModel=require('../dao/models/user.model.js')

const auth=(req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/login')
    }
    next()
}

router.get('/ErrorLogin',(req,res)=>{
    return res.redirect(`/login?error=acceso incorrecto`)
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/sessions/ErrorLogin'}) ,async(req,res)=>{
    req.session.user={//creo el usuario 
         first_name:req.user.first_name, last_name:req.user.last_name,email:req.user.email,age:req.user.age, role:req.user.role, cart:req.user.cart
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
        first_name:req.user.first_name, email:req.user.email, role:req.user.role
    }
    return res.redirect('/home')
})

router.get('/ErrorGithub', (req,res)=>{
    return res.redirect(`/login?error=Login con GitHub erroneo`)
})

router.get('/current',auth,(req,res)=>{
    req.session.user={//creo el usuario 
         first_name:req.user.first_name, last_name:req.user.last_name,email:req.user.email,age:req.user.age, role:req.user.role, cart:req.user.cart
    }
    let user=req.session.user
    res.setHeader('Content-Type','application/json')
    res.status(200).json({user})
})

router.get('/users', async(req,res)=>{
    let users= await UserModel.find({}).populate('cart.carts')
    res.setHeader('Content-Type','application/json')
    res.status(200).json(users)
})


module.exports=router