const { Sequelize, DataTypes } = require("sequelize");
const database=require("../util/databaseConnection");
const Role=database.define("Role",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    
    name:{

        type:DataTypes.STRING,
        allowNull:false
    },
    permission:{

        allowNull:false,
        type:DataTypes.TEXT,
        set(value){
            this.setDataValue("permission",JSON.stringify(value));
        },

        get(){

            return JSON.parse(this.getDataValue("permission"));
        }
    }

    
});

Role.associate=(model)=>{

    Role.hasMany(model.Admin,{foreignKey:"role_id"});
}

Role.prototype.toJSON=function(){

    const values=this.get();
    delete values.createdAt;
    delete values.updatedAt;
    return values;

}


module.exports=Role;