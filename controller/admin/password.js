const Admin = require("../../models/admin");
const util=require("../../util/helper");
const mail=require("../../config/mail");
const { where } = require("sequelize");
exports.sendemail=async(req,res,next)=>{


    try{

        let email=req.body.email;
        let code=util.randomString();
        await Admin.update({code},{where:{email}})
        let admin=await Admin.findOne({where:{email}});
        let token=await util.generateToken(admin.id,process.env.ADMIN_RESET_TOKEN_KEY,process.env.ADMIN_RESET_PASSWORD);
        mail.sendMail({

            from:process.env.MAIL_FROM,
            to:email,
            subject:"Reset Code",
            text:`You Can Reset Your password by this code ${code}`
        })

    return res.status(200).json({message:"the email Will send successfully",token})


    }catch(ex){

        res.status(500).json({message:ex})
    }
    
    

}

exports.checkcode=async(req,res,next)=>{


    let code=req.body.code;
    let admin=await Admin.findByPk(req.user.id);
    if(admin.code==code){

        let token=await util.generateToken(req.user.id,process.env.ADMIN_TOKEN_KEY,process.env.ADMIN_TOKEN_EXPIRED_AT);        
        let refreshToken=await util.generateToken(req.user.id,process.env.ADMIN_REFRESH_TOKEN_KEY,process.env.ADMIN_REFRSH_TOKEN_EXPIRED_AT);
        let expired_at=Number.parseInt(process.env.ADMIN_TOKEN_EXPIRED_AT);
        util.logout(req);
        return  res.status(200).json({refreshToken,token,expired_at})    


    }

    return res.status(402).json({message:"code is not correct"})


}


exports.changepassword=async(req,res,next)=>{

    let password=req.body.password;
    await Admin.update({password},{where:{id:req.user.id}})
    return res.status(200).json()


}