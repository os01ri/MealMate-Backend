const permission=require("../config/permission");

const checkPermissions=(value)=>{
    
    for(let i=0;i<value.length;i++){


        if(!permission.includes(value[i]))
        
        throw new Error("the permission is not correct");


    }

    return true;

}

module.exports=checkPermissions;