const fs=require("fs");
const path = require("path");
const util=require("../../util/helper");
const db = require("../../models");
exports.store=async(req,res,next)=>{


    let name=req.body.name;
    let oldpath=req.body.url;
    let newpath=util.rename(oldpath,"public/category")
    let category=await db.category.create({
        name,
        url:newpath
    })

    return res.success(category,"the category was created successfully")

}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.body.name;
    let url=req.body.url;
    if(url==undefined){

        await db.category.update({name},{where:{id}})
        return res.status(200).json()
    }
    // remove old image and move new image 
    await Category.update({name,url},{where:{id}})
    return res.success({},"the category was updated successfully")
    
}

exports.getall=async(req,res,next)=>{


    let categories=await db.category.findAll()

    return res.success(categories,"this is all categories")

}

exports.get=async(req,res,next)=>{


    let id=req.params.id;
    let category=await db.category.findByPk(id)

    return res.success(category,"this is the category")




}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let category=await db.category.findByPk(id);
    await db.category.destroy({where:{id}})
    fs.unlinkSync(category.url)
    return res.success({},"the category was deleted successfully")





}