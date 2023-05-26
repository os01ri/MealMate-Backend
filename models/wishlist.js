'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
      wishlist.belongsTo(models.ingredient,{foreignKey:"ingredient_id"});      
    
    }

  }
  wishlist.init({
  
    id:{

      type:DataTypes.UUID,
      allowNull:false,        
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    user_id:{

      type:DataTypes.UUID,
      allowNull:false,

    },

    ingredient_id:{

      type:DataTypes.UUID,
      allowNull:false,

    },
  
    
  
  }, {
    sequelize,
    modelName: 'wishlist',
    timestamps:false,
    defaultScope:{

      attributes:{
        exclude:["user_id","ingredient_id"]
      }
    }
  });
  return wishlist;
};