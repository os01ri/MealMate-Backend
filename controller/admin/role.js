const Admin = require("../../model/admin");
const Role=require("../../model/role");
exports.store=async(req,res,next)=>{


    let name=req.body.name;
    let permission=req.body.permission;
    let role=await Role.create({
        name,
        permission
    })
    res.status(200).json(role)
    
}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.query.name;
    let permission=req.query.permission;
    await Role.update({name,permission},{where:{id}})
    res.status(200).json()


}

exports.getall=async(req,res,next)=>{


    let roles=await Role.findAll({include:Admin})

    return res.status(200).json(roles)

}

exports.get=async(req,res,next)=>{


    let id=req.params.id;

    let role=await Role.findByPk(id,{include:Admin})

    return res.status(200).json(role)

}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;

    await Role.destroy({where:{id}})
    res.status(200).json()

}