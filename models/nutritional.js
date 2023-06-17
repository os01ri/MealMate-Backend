'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nutritional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      nutritional.belongsToMany(models.ingredient, { through: "ingredient_nutritionals", otherKey: "ingredient_id", foreignKey: "nutritional_id" })
    }
  }
  nutritional.init({

    id: {

      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {

      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }


  }, {
    sequelize,
    timestamps: false,
    modelName: 'nutritional',
  });
  return nutritional;
};