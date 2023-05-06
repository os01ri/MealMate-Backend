const path=require("path");
const {validationResult}=require("express-validator");
const jwt=require("jsonwebtoken");
const redis=require("../config/redis");
// const fs=require("fs");
exports.filename=(file,folder)=>{

    return `${folder}/${Date.now()}${path.extname(file.originalname)}`
    
}

// exports.rename=(oldpath,folder)=>{

    // fs.rename(oldpath,newpath)        
    // let newpath=this.randomString();
    // newpath=`${folder}/${Date.now()}${path.extname(newpath)}`

// }


exports.handleValidation= (req,res,next)=>{
    
    
    let error= validationResult(req);    
    if(!error.isEmpty()){
        error=error.array().map(object=>object.msg)
        return res.status(422).json(error)
    }

    next()
}


exports.generateToken=async(id,secret,time)=>{

    
    let token=jwt.sign({id},secret,{expiresIn:Number.parseInt(time)});
    if(secret!=process.env.ADMIN_REFRESH_TOKEN_KEY){ //cache only token ... not refresh token

        await redis.set(token,id);
        await redis.expire(token,time);

    }
    return token;

}



exports.randomString=()=>{

    let code=`${Math.round(Math.random()*10000000)}${Date.now()}`;
    return code;
}


exports.logout=async(req)=>{


    let token=req.get("Authorization").split(" ")[1];
    await redis.del(token)        
}

// exports.removeFile=(folder,file)=>{

//     let paths=path.resolve(folder,file);
//     fs.unlinkSync(paths);   

// }