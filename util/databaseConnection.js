const {Sequelize}=require("sequelize");
const sequelize=new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{

    host:process.env.DATABASE_HOST,
    dialect:process.env.DATABASE_DIALECT
});


// sequelize.beforeSync(()=>{

//     Object.values(sequelize.models).map(model=>{        
//         if(typeof model.associate==="function")
//         model.associate(sequelize.models);
//     })


// })

module.exports=sequelize;
