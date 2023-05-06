const { Sequelize, DataTypes } = require("sequelize");
const database=require("../util/databaseConnection");
const Type=database.define("Type",{

    id:{

        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    name:{

        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    url:{

        type:DataTypes.STRING,
        allowNull:true

    }
    
},{
    timestamps:false,
});

module.exports=Type;