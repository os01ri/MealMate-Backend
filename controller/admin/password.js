const util=require("../../util/helper");
const mail=require("../../config/mail");
const db = require("../../models");

exports.sendemail=async(req,res,next)=>{


    try{

        let email=req.body.email;
        let code=util.randomString();
        await db.admin.update({code},{where:{email}})
        let admin=await db.admin.findOne({where:{email}});
        let token=await util.generateToken(admin.id,process.env.ADMIN_RESET_TOKEN_KEY,process.env.ADMIN_RESET_PASSWORD);        
        mail.sendMail({

            from:process.env.MAIL_FROM,
            to:email,
            subject:"Reset Code",
            text:`You Can Reset Your password by this code ${code}`
        })

    return res.success({token},"the email Will send successfully")

    }catch(ex){

        res.error(500,ex)
    }
    
    

}

exports.checkcode=async(req,res,next)=>{


    let code=req.body.code;
    let admin=await db.admin.findByPk(req.user.id);
    if(admin.code==code){

        let token=await util.generateToken(req.user.id,process.env.ADMIN_TOKEN_KEY,process.env.ADMIN_TOKEN_EXPIRED_AT);        
        let refreshToken=await util.generateToken(req.user.id,process.env.ADMIN_REFRESH_TOKEN_KEY,process.env.ADMIN_REFRSH_TOKEN_EXPIRED_AT);
        let expired_at=Number.parseInt(process.env.ADMIN_TOKEN_EXPIRED_AT);
        util.logout(req);
        return res.success({refreshToken,token,expired_at},"this is your token info")

    }

    return res.error(402,"code is not correct")

}


exports.changepassword=async(req,res,next)=>{

    let password=req.body.password;
    await db.admin.update({password},{where:{id:req.user.id}})

    return res.success({},"the password was updated successfully")


}