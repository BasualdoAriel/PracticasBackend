const UserModel=require('../dao/models/user.model.js')
const userDTO=require('../dao/userDTO.js')

class SessionsController{
    constructor(){}

    static async login(req,res){
        req.session.user={//creo el usuario 
            first_name:req.user.first_name, last_name:req.user.last_name,email:req.user.email,age:req.user.age, role:req.user.role, cart:req.user.cart, role:req.user.role
       }
       return res.redirect('/home')
    }

    static async register(req,res){
        let {email}=req.body
        return res.redirect(`/login?mensaje=Email ${email} regisrtado correctamente.`)
    }

    static async logout(req,res){
        req.session.destroy(error=>{//desruyo la sesión
            if(error){
                return res.redirect('/login?error=Fallo en logout')
            }
        })
        res.redirect('/login')
    }

    static async callBackGitHub(req,res){
        req.session.user={//creo el usuario 
            first_name:req.user.first_name, email:req.user.email, role:req.user.role
        }
        return res.redirect('/home')
    }

    static current(req,res){
       let user=new userDTO(req.session.user)
       res.setHeader('Content-Type','application/json')
       res.status(200).json({user})
    }

    static async users(req,res){
        if(req.session.user.role==='user'){
            res.setHeader('Content-Type','application/json')
            return res.status(401).json('No autorizado')
        }
        let users= await UserModel.find({}).populate('carts.cart')
        res.setHeader('Content-Type','application/json')
        res.status(200).json(users)
    }
}


module.exports=SessionsController