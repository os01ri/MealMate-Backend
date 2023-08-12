const db = require("../../models");

exports.store=async(req,res,next)=>{

    let user_id=req.user.id;
    let recipe_id=req.body.recipe_id;
    await db.likerecipe.create({user_id,recipe_id});
    
    return res.success(null,"the recipe was added to your faviorte successfully");



}


exports.getall=async(req,res,next)=>{

    let user_id=req.user.id;
    let likerecipe=await db.user.findByPk(user_id,{
    
        attributes:[],
        
        include:[{association:"likerecipes"}]
    
    
    })
    return res.success(likerecipe,"this is all your like recipe")

}


exports.delete=async(req,res,next)=>{



    let id = req.params.id;
    await db.likerecipe.destroy({ where: { id } })
    return res.success({}, "the likerecipe was deleted successfully")

}