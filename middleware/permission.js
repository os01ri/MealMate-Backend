const Admin=require("../model/admin");
module.exports=(permission)=>{

    return async(req,res,next)=>{

        let id=req.user.id;
        console.log(id)
        let admin=await Admin.findByPk(id);
        console.log(admin)
        let permissions=admin.Role.permission;
        if(permissions.indexOf(permission)!=-1){

            return next()
        }

        res.status(403).json({message:"you dont have permission to do this action"})
        

    }



}