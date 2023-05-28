'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      User.belongsToMany(models.ingredient,{through:"wishlist",foreignKey:"user_id",otherKey:"ingredient_id"})
      User.belongsToMany(models.ingredient,{through:"grocery",foreignKey:"user_id",otherKey:"ingredient_id",as:"groceries"})
      User.hasMany(models.recipe,{foreignKey:"user_id"})
      User.hasMany(models.order,{foreignKey:"user_id"})

    }
  }

  User.prototype.toJSON=function(){

    const values=this.get();
    delete values.password;
    delete values.code;
    return values;

  }
  User.prototype.comparePassword=function(password){

    return bcrypt.compareSync(password,this.password);
  }
  User.init({

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

  status:{

    type:DataTypes.BOOLEAN,
    defaultValue:false
},

  }, {
    sequelize,
    modelName: 'user',
    timestamps:false,
    defaultScope:{

    }
  });
  return User;
};