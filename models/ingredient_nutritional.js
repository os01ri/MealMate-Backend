'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class ingredient_nutritional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      ingredient_nutritional.belongsTo(models.unit, { foreignKey: "unit_id" })
    }
  }
  ingredient_nutritional.init({

    id: {

      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    ingredient_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Ingredients",
        key: "id"

      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },

    nutritional_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Nutritionals",
        key: "id"

      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
      , defaultValue: 0
    },

    unit_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Units",
        key: "id"

      },

    },


    precent: {

      type: DataTypes.INTEGER,
      allowNull: false

    },



  }, {
    sequelize,
    modelName: 'ingredient_nutritional',
    timestamps: false,
    defaultScope: {

      include: db.unit

    }
  });
  return ingredient_nutritional;
};