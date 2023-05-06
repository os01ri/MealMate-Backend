const Role=require("../model/role");
const permission=require("../config/permission");
const Admin=require("../model/admin");

const createSuperAdmin=async()=>{

    
    let role=await Role.create({

        name:"SuperAdmin",
        permission
    });

    let admin=await Admin.create({

        name:"ali hmaidi",
        email:"alihmaidi019@gmail.com",
        password:"ali450892",
        role_id:role.id        
    })    
    
}


module.exports=createSuperAdmin;