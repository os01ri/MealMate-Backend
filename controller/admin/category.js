const fs=require("fs");
const path = require("path");
const util=require("../../util/helper");
const Category = require("../../model/category");
exports.store=async(req,res,next)=>{


    let name=req.body.name;
    let oldpath=req.body.url;
    // move new image
    let category=await Category.create({

        name,
        url:oldpath
    })
 
    return res.status(200).json(category);

}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.body.name;
    let url=req.body.url;
    if(url==undefined){

        await Category.update({name},{where:{id}})
        return res.status(200).json()
    }
    // remove old image and move new image 
    await Category.update({name,url},{where:{id}})
    res.status(200).json()
    
}

exports.getall=async(req,res,next)=>{


    let categories=await Category.findAll()
    res.status(200).json(categories)

}

exports.get=async(req,res,next)=>{


    let id=req.params.id;
    let category=await Category.findByPk(id)
    res.status(200).json(category)



}


exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let category=await Category.findByPk(id);
    await Category.destroy({where:{id}})
    fs.unlinkSync(category.url)
    res.status(200).json()





}