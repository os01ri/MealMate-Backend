const db = require("../../models");
const unit = require("../../models/unit");

exports.store=async(req,res,next)=>{

    let name=req.body.name;
    let code=req.body.code;
    let unit=await db.unit.create({name,code});
    return res.success(unit,"the unit was added successfully");


}


exports.update=async(req,res,next)=>{

    let id=req.params.id;
    let name=req.body.name;
    let code=req.body.code;

    await db.unit.update({name,code},{where:{id}}) 
    let unit=await db.unit.findByPk(id);

    return res.success(unit,"the unit was updated successfully");


}


exports.getall=async(req,res,next)=>{


    let units=await db.unit.findAll();
    return res.success(units);

    


}

exports.get=async(req,res,next)=>{


    let id=req.params.id;
    let unit=await db.unit.findByPk(id);
    
    return res.success(unit,"this is your unit");
}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await db.unit.destroy({where:{id}})
    return res.success({},"the unit was deleted successfully");


}