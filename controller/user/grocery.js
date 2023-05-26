const db = require("../../models");

exports.store=async(req,res,next)=>{


    let quantity=req.body.quantity;
    let ingredient_id=req.body.ingredient_id;
    let user_id=req.user.id;
    let grocery=await db.grocery.create({quantity,ingredient_id,user_id})
    grocery=await db.grocery.findByPk(grocery.id,{include:db.ingredient})
    return res.status(200).json(grocery)



}

exports.getall=async(req,res,next)=>{


    let groceries=await db.grocery.findAll({where:{user_id:req.user.id},include:db.ingredient})
    return res.status(200).json(groceries)


}

exports.delete=async(req,res,next)=>{

    await db.grocery.destroy({where:{id:req.params.id}})
    return res.status(200).json()


}


exports.update=async(req,res,next)=>{


    let quantity=req.body.quantity;
    let ingredient_id=req.body.ingredient_id;
    let grocery=await db.grocery.update({quantity,ingredient_id},{where:{id:req.params.id}})
    grocery=await db.grocery.findByPk(req.params.id,{include:db.ingredient})
    return res.status(200).json(grocery)    

}