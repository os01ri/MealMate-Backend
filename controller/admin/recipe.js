const db = require("../../models");
const util=require("../../util/helper");
const fs=require("fs")
exports.store=async(req,res,next)=>{

    let name=req.body.name;
    let description=req.body.description;
    let time=req.body.time;
    let oldpath=req.body.url;
    let url=util.rename(oldpath,"public/recipe")
    let type_id=req.body.type_id;
    let category_id=req.body.category_id;
    let steps=req.body.step;
    let recipe=await db.recipe.create({name,description,time,url,type_id,category_id,steps});
    let ingredient=req.body.ingredient;
    let recipe_ingredient=ingredient.map(object=>({ingredient_id:object.id,recipe_id:recipe.id,quantity:object.quantity}))
    await db.recipe_ingredient.bulkCreate(recipe_ingredient)
    recipe=await db.recipe.findByPk(recipe.id,{include:[db.type,db.category,db.ingredient,db.step]})
    res.status(200).json(recipe)

}

exports.getall=async(req,res,next)=>{

    let recipes=await db.recipe.findAll({include:[db.type,db.category,db.ingredient,db.step]})
    res.status(200).json(recipes)

}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let recipes=await db.recipe.findByPk(id,{include:[db.type,db.category,db.ingredient,db.step]})
    res.status(200).json(recipes)

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let category=await db.recipe.findByPk(id);
    await db.recipe.destroy({where:{id}})
    fs.unlinkSync(category.url)
    res.status(200).json()



}