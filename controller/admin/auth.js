const db = require("../../models");
const util=require("../../util/helper");
exports.login=async(req,res,next)=>{

    let email=req.body.email;
    let password=req.body.password;
    let admin=await db.admin.findOne({
        where:{
            email            
        },
        include:{

            model:db.role
        }        
        
    });
    if(admin.comparePassword(password)){

        admin=admin.toJSON();     
        
        let token=await util.generateToken(admin.id,process.env.ADMIN_TOKEN_KEY,process.env.ADMIN_TOKEN_EXPIRED_AT);
        let refreshToken=await util.generateToken(admin.id,process.env.ADMIN_REFRESH_TOKEN_KEY,process.env.ADMIN_REFRSH_TOKEN_EXPIRED_AT);        
        let exipred_at=Number.parseInt(process.env.ADMIN_TOKEN_EXPIRED_AT);
        let token_info={
            token,
            refreshToken,
            exipred_at
        };
        admin.token_info=token_info;

        return res.status(200).json(admin)
    }

    return res.status(200).json({message:"the password is not correnct"})


}


exports.refreshtoken=async(req,res,next)=>{


    let token=await util.generateToken(req.user.id,process.env.ADMIN_TOKEN_KEY,process.env.ADMIN_TOKEN_EXPIRED_AT);        
    let refreshToken=await util.generateToken(req.user.id,process.env.ADMIN_REFRESH_TOKEN_KEY,process.env.ADMIN_REFRSH_TOKEN_EXPIRED_AT);
    let expired_at=Number.parseInt(process.env.ADMIN_TOKEN_EXPIRED_AT);
    res.status(200).json({refreshToken,token,expired_at})    
    res.status(200).json()



}


exports.logout=async(req,res,next)=>{


    util.logout(req)
    .then(()=>res.status(200).json({message:"you are logout successfully"}))
    .catch(()=>res.status(500).json({message:"we have error"}))



}