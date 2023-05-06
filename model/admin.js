const { Sequelize, DataTypes } = require("sequelize");
const database=require("../util/databaseConnection");
const bcrypt=require("bcrypt");
const Role=require("./role");
const Admin=database.define("Admin",{

    id:{

        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    name:{

        type:DataTypes.STRING,
        allowNull:false
    },
    email:{

        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    code:{

        type:DataTypes.STRING,
        allowNull:true

    },
    password:{

        type:DataTypes.STRING,
        allowNull:false,
        set(value){

            this.setDataValue("password",bcrypt.hashSync(value,10));
        },
        

    },
    logo:{

        type:DataTypes.STRING,
        allowNull:true
    },
    role_id:{

        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:"Roles",
            key:"id"
            
        },
        onUpdate:"cascade"
    }


},{
    timestamps:false,
    defaultScope:{

        include:[{
            model:Role
        }]
    }    

});




Admin.prototype.comparePassword=function(password){

    return bcrypt.compareSync(password,this.password);
}
Admin.associate=(model)=>{

    Admin.belongsTo(model.Role,{foreignKey:"role_id"});
}



Admin.prototype.toJSON=function(){

    const values=this.get();
    delete values.password;
    delete values.RoleId;
    delete values.code;
    return values;

}

module.exports=Admin;