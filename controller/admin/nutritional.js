const Nutritional=require("../../models/nutritional");
const Ingredient=require("../../models/ingredient");
const db = require("../../models");
exports.store=async(req,res,next)=>{
    

    let name=req.body.name;
    let nutritional=await db.nutritional.create({name})
    return res.status(200).json(nutritional)



}


exports.update=async(req,res,next)=>{

    let id=req.params.id;
    let name=req.body.name;
    await db.nutritional.update({name},{where:{id}})
    return res.status(200).json()


}

exports.getall=async(req,res,next)=>{

    let nutritionals=await db.nutritional.findAll();
    res.status(200).json(nutritionals)


}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let nutritional=await db.nutritional.findByPk(id);
    res.status(200).json(nutritional)

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await db.nutritional.destroy({where:{id}})
    res.status(200).json()


}