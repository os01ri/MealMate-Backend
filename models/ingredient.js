'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ingredient.belongsToMany(models.nutritional,{through:"ingredient_nutritionals",foreignKey:"ingredient_id",otherKey:"nutritional_id"})

    }
  }
  ingredient.init({
    
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
    }

  }, {
    sequelize,
    modelName: 'ingredient',
    timestamps:false
  });
  return ingredient;
};