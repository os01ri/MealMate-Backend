const sharp=require("sharp");
const path=require("path");
const helper=require("../util/helper");
const { compareSync } = require("bcrypt");
const db = require("../models");
// const Temp = require("../model/temp");
exports.addImage=async(req,res,next)=>{

    
    try{
        let files=req.files;
        let images=[];
        for(let file of files){
            let url= helper.filename(file,"public/temp");
            await sharp(file.buffer).resize(400,400).toFile(path.resolve(url));        
            images.push({url:process.env.APP_URL+url});
        }        
        await db.temp.bulkCreate(images);
        return res.success(images,"this is the image")

    }catch(err){

        return res.error(400,err)

    }

}


