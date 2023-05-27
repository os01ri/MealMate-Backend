
const db = require("../../models");
exports.store=async(req,res,next)=>{
    

    let name=req.body.name;
    let nutritional=await db.nutritional.create({name})
    return res.success(nutritional,"the nutritional was added successfully")




}


exports.update=async(req,res,next)=>{

    let id=req.params.id;
    let name=req.body.name;
    await db.nutritional.update({name},{where:{id}})
    return res.success({},"the nutritional was updated successfully")


}

exports.getall=async(req,res,next)=>{

    let nutritionals=await db.nutritional.findAll();
    return res.success(nutritionals,"this is all your nutritionals")


}

exports.get=async(req,res,next)=>{

    let id=req.params.id;
    let nutritional=await db.nutritional.findByPk(id);
    return res.success(nutritional,"this is your nutritional")

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await db.nutritional.destroy({where:{id}})
    return res.success({},"the nutritional was deleted successfully")


}