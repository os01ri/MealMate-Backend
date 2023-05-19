const fs=require("fs");
const util=require("../../util/helper");
const db = require("../../models");
exports.store=async(req,res,next)=>{

        
    let name=req.body.name;
    let oldpath=req.body.url;
    let newpath=util.rename(oldpath,"public/type")    
    let type=await db.type.create({

        name,
        url:newpath
    })
 
    return res.status(200).json(type);



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
    res.status(200).json()



}

exports.getall=async(req,res,next)=>{

    let types=await db.type.findAll()
    res.status(200).json(types)



}


exports.get=async(req,res,next)=>{



    let id=req.params.id;
    let type=await db.type.findByPk(id)
    res.status(200).json(type)


}

exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let type=await db.type.findByPk(id);
    await db.type.destroy({where:{id}})
    fs.unlinkSync(type.url)
    res.status(200).json()

}