'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unlike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unlike.belongsTo(models.ingredient,{foreignKey:"ingredient_id"})
    }
  }
  unlike.init({

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


    ingredient_id: {

      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "ingredients",
        key: "id"
      },

    },


  }, {
    sequelize,
    modelName: 'unlike',
    indexes: [{

      unique: true,
      fields: ["user_id", "ingredient_id"]

    }],
    timestamps: false
  });
  return unlike;
};