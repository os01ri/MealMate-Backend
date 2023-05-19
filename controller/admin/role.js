const db = require("../../models");

exports.store=async(req,res,next)=>{


    let name=req.body.name;
    let permission=req.body.permission;
    let role=await db.role.create({
        name,
        permission
    })
    res.status(200).json(role)
    
}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.query.name;
    let permission=req.query.permission;
    await db.role.update({name,permission},{where:{id}})
    res.status(200).json()


}

exports.getall=async(req,res,next)=>{


    let roles=await db.role.findAll({include:{model:db.admin}})

    return res.status(200).json(roles)

}

exports.get=async(req,res,next)=>{


    let id=req.params.id;

    let role=await db.role.findByPk(id,{include:db.admin})

    return res.status(200).json(role)

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    await db.role.destroy({where:{id}})
    res.status(200).json()

}