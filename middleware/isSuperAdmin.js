const db = require("../models");

module.exports=async(req,res,next)=>{

        let id=req.user.id;
        let count=await db.admin.count({where:{id,is_superAdmin:true}});
        if(count==0){
            
            return res.error(403,"you dont have permission to do this action")


        }

        
        next();        

    }


