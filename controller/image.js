const sharp=require("sharp");
const path=require("path");
const helper=require("../util/helper");
const { compareSync } = require("bcrypt");
// const Temp = require("../model/temp");
exports.addImage=async(req,res,next)=>{

    try{
        let files=req.files;
        let images=[];
        for(let file of files){
            let url= path.resolve(helper.filename(file,"public/temp"));        
            await sharp(file.buffer).resize(400,400).toFile(url);        
            images.push(url);
        }        
        res.status(200).json(images)
    }catch(err){

        res.status(400).json({message:err})

    }

}


