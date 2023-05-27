const database=require("../models/index");

const rule=(model,name,expect=false)=>async(value,{req})=>{
    
    let count=0;

    if(expect){

        let id=req.params.id||req.query.id||req.body.id;
        console.log("ali"+id)
        count=await database.sequelize.model(model).count({where:{[name]:value,id:{[Op.not]:id}}});
        
        console.log("uniq"+count)
    }else{


        count=await database.sequelize.model(model).count({where:{[name]:value}})
    }    
    if(count!=0){
        throw new Error(`the ${name} is not unique in our database`);
    }

    
}


module.exports=rule;