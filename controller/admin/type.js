const Type = require("../../model/type");
const fs=require("fs");
exports.store=async(req,res,next)=>{

    
    let name=req.body.name;
    let oldpath=req.body.url;
    // move new image
    let type=await Type.create({

        name,
        url:oldpath
    })
 
    return res.status(200).json(type);



}

exports.update=async(req,res,next)=>{


    let id=req.params.id;
    let name=req.body.name;
    let url=req.body.url;
    if(url==undefined){

        await Type.update({name},{where:{id}})
        return res.status(200).json()
    }
    // remove old image and move new image 
    await Type.update({name,url},{where:{id}})
    res.status(200).json()



}

exports.getall=async(req,res,next)=>{

    let types=await Type.findAll()
    res.status(200).json(types)



}


exports.get=async(req,res,next)=>{



    let id=req.params.id;
    let type=await Type.findByPk(id)
    res.status(200).json(type)


}

exports.delete=async(req,res,next)=>{


    let id=req.params.id;
    let type=await Type.findByPk(id);
    await Type.destroy({where:{id}})
    fs.unlinkSync(type.url)
    res.status(200).json()

}