const fs=require("fs");
const util=require("../../util/helper");
const db = require("../../models");
const { type } = require("os");
exports.store=async(req,res,next)=>{

     
    let name=req.body.name;
    let oldpath=req.body.url;
    let newpath=util.rename(oldpath,"public/type")    
    let type=await db.type.create({

        name,
        url:newpath
    })
 
    return res.success(type,"the type was added successfully")


}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.body.name;
    let url=req.body.url;
    if(url==undefined){

        await db.type.update({name},{where:{id}})
        return res.status(200).json()
    }
    // remove old image and move new image 
    await db.type.update({name,url},{where:{id}})
    return res.success({},"the type was updsted successfully")



}

exports.getall=async(req,res,next)=>{

    let types=await db.type.findAll()
    return res.success(types,"this is all type")



}


exports.get=async(req,res,next)=>{



    let id=req.params.id;
    let type=await db.type.findByPk(id)
    return res.success(type,"this is your type")


}

exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let type=await db.type.findByPk(id);
    await db.type.destroy({where:{id}})
    fs.unlinkSync(type.url)
    return res.success({},"the type was deleted successfully")
    

}