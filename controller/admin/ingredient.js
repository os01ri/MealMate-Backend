const Ingredient=require("../../models/ingredient");
exports.store=async(req,res,next)=>{


    let name=req.body.name;
    let ingredient=await Ingredient.create({name})
    return res.status(200).json(ingredient)



}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.body.name;
    await Ingredient.update({name},{where:{id}})
    return res.status(200).json()

}

exports.getall=async(req,res,next)=>{

    let ingredients=await Ingredient.findAll();
    res.status(200).json(ingredients)

}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let ingredient=await Ingredient.findByPk(id);
    res.status(200).json(ingredient)

}

exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await Ingredient.destroy({where:{id}})
    res.status(200).json()


}