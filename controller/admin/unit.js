const db = require("../../models");
const unit = require("../../models/unit");



exports.getall=async(req,res,next)=>{


    let units=await db.unit.findAll();
    return res.success(units,"this is all units");

    


}

exports.get=async(req,res,next)=>{


    let id=req.params.id;
    let unit=await db.unit.findByPk(id);
    
    return res.success(unit,"this is your unit");
}

