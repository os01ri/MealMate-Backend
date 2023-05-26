const db = require("../models");
module.exports=async(req,res,next)=>{

        
    let user=await db.user.findByPk(req.user.id);

    if(user.status){


        return res.status(200).json({message:"the Account is already verifed"})

    }

    next();



}
