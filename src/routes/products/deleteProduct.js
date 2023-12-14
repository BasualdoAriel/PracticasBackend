const {Router}=require('express')
const router=Router()
const productModel=require('../../dao/models/products.model.js')

router.delete('/:id', async(req,res)=>{
    let id=parseInt(req.params.id)
    let product= await productModel.find({id:id})
    if(product.length===0){//si es igual a 0 no existe prducto con ese id.        
        res.setHeader('Content-Type','applicattion/json')
        return res.status(400).json({message:`id invalido: ${id}`})
    }
    await productModel.deleteOne({id:id})//Elimina el registro 
    res.setHeader('Content-Type','applicattion/json')
    return res.status(200).json({message:'Eliminado.'})

})

module.exports=router