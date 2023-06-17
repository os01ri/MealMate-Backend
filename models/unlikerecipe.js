'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unlikerecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  unlikerecipe.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },


    user_id: {

      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id"

      },

    },



    recipe_id: {

      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "recipes",
        key: "id"

      },

    },



  }, {
    sequelize,
    modelName: 'unlikerecipe',
    timestamps: false,
    indexes: [{

      unique: true,
      fields: ["user_id", "recipe_id"]

    }],
  });
  return unlikerecipe;
};