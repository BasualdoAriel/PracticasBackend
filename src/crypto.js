const bcrypt=require('bcrypt')

const crearHash=(password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const validarPassword=(user, password)=> {
    console.log(bcrypt.compareSync(password,user.password));
    return bcrypt.compareSync(password,user.password)
}

module.exports={crearHash, validarPassword}