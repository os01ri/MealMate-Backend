const database=require("../models/index");

const rule=async(value,{req})=>{

    let user_id=req.user.id;
    let count=await database.recipe.count({where:{

        id:value,
        [database.Sequelize.Op.or]:{

            user_id,
            status:true
        }


    }});

    if(count==0){

        throw new Error("you don't have permission to do that action");
    }
    
}


module.exports=rule;