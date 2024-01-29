class UserController{
    constructor(){}

    static login(req,res){
        let {error,mensaje}=req.query//recibo mensajes o errores.
 
        res.setHeader('Content-Type','text/html')
        res.status(200).render('login',{error,mensaje})
    }

    static register(req,res){
        let {error}=req.query //recibo error
        res.setHeader('Content-Type','text/html')
        res.status(200).render('registro',{error})
    }

    static profile(req,res){
        let user={
            first_name:req.session.user.first_name,
            last_name:req.session.user.last_name,
            email:req.session.user.email,
            age:req.session.user.age,
            cart:req.session.user.cart,
            role:req.session.user.role
        }
        if(user.role==="admin"){//si el rol es admin, muesro la info en /profile.
            let admin=true
            res.setHeader('Content-Type','text/html')
            res.status(200).render('profile',{user,admin})
        }else{
            res.setHeader('Content-Type','text/html')
            res.status(200).render('profile',{user})
        }
    }
}

module.exports=UserController