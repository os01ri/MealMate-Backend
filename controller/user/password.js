const util=require("../../util/helper");
const mail=require("../../config/mail");
const db = require("../../models");

exports.sendemail=async(req,res,next)=>{

    try{

        let email=req.body.email;
        let code=util.randomString();
        await db.user.update({code},{where:{email}})
        let user=await db.user.findOne({where:{email}});
        let token=await util.generateToken(user.id,process.env.USER_RESET_TOKEN_KEY,process.env.USER_RESET_PASSWORD);        
        mail.sendMail({
    
            from:process.env.MAIL_FROM,
            to:email,
            subject:"Reset Code",
            text:`You Can Reset Your password by this code ${code}`
        })
    
        return res.status(200).json({message:"the email Will send successfully",token})
    
    

    }catch(ex){

        return res.status(200).json({message:ex})
    }
    

}



exports.checkcode=async(req,res,next)=>{

    let code=req.body.code;
    let user=await db.user.findByPk(req.user.id);
    if(user.code==code){

        let token=await util.generateToken(req.user.id,process.env.USER_TOKEN_KEY,process.env.USER_TOKEN_EXPIRED_AT);        
        let refreshToken=await util.generateToken(req.user.id,process.env.USER_REFRESH_TOKEN_KEY,process.env.USER_REFRSH_TOKEN_EXPIRED_AT);
        let expired_at=Number.parseInt(process.env.USER_TOKEN_EXPIRED_AT);
        util.logout(req);
        return  res.status(200).json({refreshToken,token,expired_at})    


    }

    return res.status(402).json({message:"code is not correct"})





}

exports.changepassword=async(req,res,next)=>{


    let password=req.body.password;
    await db.user.update({password},{where:{id:req.user.id}})
    return res.status(200).json()



}