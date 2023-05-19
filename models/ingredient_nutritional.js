'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient_nutritional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ingredient_nutritional.init({
  
    id:{

        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    ingredient_id:{

        type:DataTypes.UUID,
        allowNull:false
    },
    nutritional_id:{

        type:DataTypes.UUID,
        allowNull:false
    },
    value:{
      type:DataTypes.INTEGER,
      allowNull:false
      ,defaultValue:0
    }

  
  }, {
    sequelize,
    modelName: 'ingredient_nutritional'
  });
  return ingredient_nutritional;
};