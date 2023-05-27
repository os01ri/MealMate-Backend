const database=require("../models/index");
const rule=(model,name)=>async(value)=>{
        
    let ids=value.map((object)=>object.id)
    let count=await database.sequelize.model(model).count({where:{[name]:ids}})
    console.log(count)
    if(count!=ids.length){
        throw new Error(`the array id  is not exists in our database table`);
    }

    
}


module.exports=rule;