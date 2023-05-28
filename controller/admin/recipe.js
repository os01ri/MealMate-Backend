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
    let recipe=await db.recipe.create({name,description,time,url,type_id,category_id,steps,status:true});
    steps=steps.map(ob=>({name:ob.name,rank:ob.rank,recipe_id:recipe.id,description:ob.description}))
    await db.step.bulkCreate(steps);
    let ingredient=req.body.ingredient;
    let recipe_ingredient=ingredient.map(object=>({ingredient_id:object.id,recipe_id:recipe.id,quantity:object.quantity,unit_id:object.unit_id}))
    await db.recipe_ingredient.bulkCreate(recipe_ingredient)
    recipe=await db.recipe.findByPk(recipe.id,{include:[db.type,db.category,db.ingredient,db.step]})
    res.status(200).json(recipe)

}

exports.getall=async(req,res,next)=>{

    let recipes=await db.recipe.findAll({include:[db.type,db.category,db.ingredient,db.step]})
    return res.success(recipes,"thiss is all recipes")

}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let recipes=await db.recipe.findByPk(id,{include:[db.type,db.category,db.ingredient,db.step]})
    return res.success(recipes,"this is the recipe")

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let category=await db.recipe.findByPk(id);
    await db.recipe.destroy({where:{id}})
    fs.unlinkSync(category.url)
    
    return res.success({},"the recipe was deleted successfully")



}


exports.getunactive=async(req,res,next)=>{


    let recipes=await db.recipe.findAll({include:[db.type,db.category,db.ingredient,db.step],where:{status:false}})
    return res.success(recipes,"this is all unactive recipes")


}

exports.accept=async(req,res,next)=>{


    let id=req.params.id;
    await db.recipe.update({status:true},{where:{id}})
    return res.success({},"the recipe was accepted successfully")



}


exports.storeByUser=async(req,res,next)=>{

    let name=req.body.name;
    let user_id=req.user.id;
    let description=req.body.description;
    let time=req.body.time;
    let oldpath=req.body.url;
    let url=util.rename(oldpath,"public/recipe")
    let type_id=req.body.type_id;
    let category_id=req.body.category_id;
    let steps=req.body.step;
    let recipe=await db.recipe.create({name,description,time,url,type_id,user_id,category_id,steps,status:false});
    steps=steps.map(ob=>({name:ob.name,rank:ob.rank,recipe_id:recipe.id,description:ob.description}));
    await db.step.bulkCreate(steps);
    let ingredient=req.body.ingredient;
    let recipe_ingredient=ingredient.map(object=>({ingredient_id:object.id,recipe_id:recipe.id,quantity:object.quantity,unit_id:object.unit_id}))
    await db.recipe_ingredient.bulkCreate(recipe_ingredient)
    recipe=await db.recipe.findByPk(recipe.id,{include:[db.type,db.category,db.ingredient,db.step]})
    res.status(200).json(recipe)

}

exports.getalluser=async(req,res,next)=>{

    let recipes=await db.recipe.findAll({include:[db.type,db.category,db.ingredient,db.step],where:{status:true}})
    return res.success(recipes,"this is all recipes")


}


exports.getUserRecipe=async(req,res,next)=>{


    let user_id=req.user.id;
    let recipes=await db.recipe.findAll({where:{user_id},include:[db.type,db.category,db.step,db.ingredient]});

    return res.success(recipes,"this is all recipe for you")

}


exports.getAllwithUserRecipe=async(req,res,next)=>{


    let user_id=req.user.id;

    let recipes=await db.recipe.findAll({include:[db.type,db.category,db.step,db.ingredient],
        
        where:{

        [db.Sequelize.Op.or]:{

            user_id,
            status:true

        }

        }

    });

    return res.success(recipes,"this is all recipes")


}