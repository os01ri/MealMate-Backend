const database=require("../util/databaseConnection");
const rule=(model,name)=>async(value)=>{
    
    if(!value){

        return ;
    }
    let count=await database.model(model).count({where:{

        [name]:value

    }});
    if(count==0){
        throw new Error(`the ${name} is not exists in our database`);
    }

    
}


module.exports=rule;