const passport=require('passport')
const local=require('passport-local')
const github=require('passport-github2')
const usersModel = require('../dao/models/user.model.js')
const crypto=require('../crypto.js')
const configGitHub=require('./config.js')

const initPassport=()=>{
    passport.use('register',new local.Strategy( //Registro de usuario
        {
            passReqToCallback:true, usernameField:'email'

        },
        async(req, username,password,done)=>{
            try {
                let {first_name,last_name,email,age}=req.body
                if(!first_name||!last_name||!email||!password||!age){
                    return done(null, false)
                }
                let regMail=/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
                if(!regMail.test(email)){
                    return done(null, false)
                }
                let exist=await usersModel.findOne({email})
                if(exist){
                    return done(null, false)
                }
                password=crypto.crearHash(password)
                let user
                try {
                    user=await usersModel.create({first_name,last_name,email,age,password,cart:'65a83e9700bd74cc3eed6556'})//asigno un carrito vacio para el registro
                    return done(null, user)
                } catch (error) {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new local.Strategy(//login con email y password
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
    
    passport.use('github', new github.Strategy(//registro e inicio de sesión con github
        {
            clientID:configGitHub.CLIENT_ID,
            clientSecret:configGitHub.CLIENT_SECRET,
            callbackURL:configGitHub.CALLBACK_URL
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                let user=await usersModel.findOne({email:profile._json.email})
                if(!user){
                    let name=profile._json.name.split(" ")
                    let first_name=name[0]
                    let last_name=name[1]
                    let newUser={
                        first_name,
                        last_name,                        
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