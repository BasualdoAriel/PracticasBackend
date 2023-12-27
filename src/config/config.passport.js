const passport=require('passport')
const local=require('passport-local')
const github=require('passport-github2')
const usersModel = require('../dao/models/user.model.js')
const crypto=require('../crypto.js')

const initPassport=()=>{
    passport.use('register',new local.Strategy(
        {
            passReqToCallback:true, usernameField:'email'

        },
        async(req, username,password,done)=>{
            try {
                let {name,email}=req.body

                if(!name||!email||!password){
                    //return res.redirect('/register?error=Completá todos los campos!')
                    return done(null, false)
                }
            
                let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
                console.log(regMail.test(email))
                if(!regMail.test(email)){
                    //return res.redirect('/register?error=Mail con formato incorrecto...!!!')
                    return done(null, false)
                }
            
                let exist=await usersModel.findOne({email})
                if(exist){
                    //return res.redirect(`/register?error=Email: ${email} ya está regisrado.`)
                    return done(null, false)
                }
            
                //password=crypto.createHmac('sha256','ArielBasualdo').update(password).digest('hex')
                password=crypto.crearHash(password)
                let user
            
                try {
                    user=await usersModel.create({name,email,password})
                    //return res.redirect(`/login?mensaje=Email ${email} regisrtado correctamente.`)
                    return done(null, user)
                } catch (error) {
                    //return res.redirect('/register?error=error inespesrado. Reintente')
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
        ))

    passport.use('login', new local.Strategy(
        {
            usernameField:'email'
        },
        async(username,password,done)=>{
            try {
                if(!username||!password){//si no exise email o password, solicito nuevamente
                    return done(null, false)
                }
                let user=await usersModel.findOne({email:username}).lean()//busco si existe el usuario
                if(!user){//si no existe, solicito nuevamene datos.
                    return done(null, false)
                }
                if(!crypto.validarPassword(user,password)){//si no existe, solicito nuevamene datos.
                    return done(null, false)
                }
                delete user.password
                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    ))
    
    passport.use('github', new github.Strategy(
        {
            clientID:'Iv1.7ae6a07789335af4',
            clientSecret:'04f0efd87cef5017eb557b490d65e83d8dabb6b5',
            callbackURL:'http://localhost:3000/sessions/callbackGithub'
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                let user=await usersModel.findOne({email:profile._json.email})
                if(!user){
                    let newUser={
                        name:profile._json.name,
                        email: profile._json.email,
                        profile
                    }
                    user=await usersModel.create(newUser)
                }
                return done(null, user)

            } catch (error) {
                done(error)
            }
        }
    ))
        //config serializador

        passport.serializeUser((user,done)=>{
            return done(null, user._id)
        })

        passport.deserializeUser(async(id,done)=>{
            let user=await usersModel.findById(id)
            done(null, user)
        })

}//fin initpassport

module.exports =initPassport