const db = require("../../models");
exports.store=async(req,res,next)=>{



    console.log(req.body)
    let name=req.body.name;
    let nutritional=req.body.nutritional;
    let ingredient=await db.ingredient.create({name});
    let pivot=nutritional.map(object=>{
        object.ingredient_id=ingredient.id;
        return object
    })
    await db.ingredient_nutritional.bulkCreate(pivot)
    ingredient=await db.ingredient.findByPk(ingredient.id,{include:{model:db.nutritional,through:{attributes:["value"]}}})
    return res.status(200).json(ingredient)



}
    


exports.update=async(req,res,next)=>{

    let id=req.params.id;
    let name=req.body.name;
    let nutritional=req.body.nutritional;
    await db.ingredient.update({name},{where:{id}})
    await db.ingredient_nutritional.destroy({where:{ingredient_id:id}})
    let pivot=nutritional.map(object=>{
        object.ingredient_id=id;
        return object
    })
    await db.ingredient_nutritional.bulkCreate(pivot)
    let ingredient=await db.ingredient.findByPk(id,{include:{model:db.nutritional,through:{attributes:["value"]}}})
    return res.status(200).json(ingredient)


}

exports.getall=async(req,res,next)=>{

    let ingredients=await db.ingredient.findAll({include:{model:db.nutritional,through:{attributes:["value"]}}});
    res.status(200).json(ingredients)

}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let ingredient=await db.ingredient.findByPk(id,{include:{model:db.nutritional,through:{attributes:["value"]}}});
    res.status(200).json(ingredient)

}

exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await db.ingredient.destroy({where:{id}})
    res.status(200).json()


}