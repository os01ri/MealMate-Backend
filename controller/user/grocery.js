const db = require("../../models");

exports.store=async(req,res,next)=>{

    console.log(req.body)
    let quantity=req.body.quantity;
    let ingredient_id=req.body.ingredient_id;

    let user_id=req.user.id;


    let unit_id=req.body.unit_id;


    let grocery=await db.grocery.create({quantity,ingredient_id,user_id,unit_id})
    grocery=await db.grocery.findByPk(grocery.id,{include:[db.ingredient,db.unit]})
    return res.success(grocery,"the ingredient was added to house successfully")



}

exports.getall=async(req,res,next)=>{


    let groceries=await db.grocery.findAll({where:{user_id:req.user.id},include:[db.ingredient,db.unit]})
    return res.success(groceries,"this is all ingredient in your house")


}

exports.delete=async(req,res,next)=>{

    await db.grocery.destroy({where:{id:req.params.id}})
    return res.success({},"the ingredient was deleted from house successfully")


}


exports.update=async(req,res,next)=>{


    let quantity=req.body.quantity;
    let unit_id=req.body.unit_id;
    let ingredient_id=req.body.ingredient_id;
    let id=req.params.id;
    let grocery=await db.grocery.update({quantity,ingredient_id,unit_id},{where:{id}})
    grocery=await db.grocery.findByPk(req.params.id,{include:[db.ingredient,db.unit]})
    return res.success(grocery,"the ingredient was updated successfully")

}