'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe_ingredient.init({
    
    id:{

      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    recipe_id:{

        type:DataTypes.UUID,
        allowNull:false
    },
    ingredient_id:{

      type:DataTypes.UUID,
      allowNull:false
    },
    quantity:{

      type:DataTypes.DOUBLE,
      allowNull:false
    },


  }, {
    sequelize,
    modelName: 'recipe_ingredient',
  });
  return recipe_ingredient;
};