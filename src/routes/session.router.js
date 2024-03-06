const {Router}=require('express')
const router=Router()
const passport=require('passport')
const SessionsController = require('../controller/sessions.controller.js')
const errorHandler = require('../middlewares/errorHandler.js')

router.use(errorHandler)

const auth=(req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/login')
    }
    next()
}

router.get('/ErrorLogin',(req,res)=>{
    return res.redirect(`/login?error=acceso incorrecto`)
})

router.post('/login',passport.authenticate('login',{failureRedirect:'/sessions/ErrorLogin'}) , SessionsController.login)

router.get('/errorRegistro',(req,res)=>{
    return res.redirect('/register?error=error en proceso de registro!')
})

router.post('/register', passport.authenticate('register',{failureRedirect:'/sessions/errorRegistro'}), SessionsController.register)

router.get('/logout', SessionsController.logout)

router.get('/github',passport.authenticate('github',{}),(req,res)=>{})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:'/sessions/ErrorGithub'}), SessionsController.callBackGitHub)

router.get('/ErrorGithub', (req,res)=>{
    return res.redirect(`/login?error=Login con GitHub erroneo`)
})

router.get('/current',auth, SessionsController.current)

router.get('/users', SessionsController.users)

router.post('/sendRecovery',SessionsController.sendRecovery)

router.get('/recovery',(req,res)=>{
    res.status(200).render('sendRecovery')
})

router.get('/recovreyAccepeted',(req,res)=>{
    let {token}=req.query

    try {
        let verifyToken=jwt.verify(token,'secretKey')
        res.redirect(`htpp://localhost:3000/recoveryAccepeted?token="${token}"`)
    } catch (error) {
        console.log(error)
        res.redirect('/home')
    }
})

router.get('/premium/:uid', auth, SessionsController.premium)


module.exports=router