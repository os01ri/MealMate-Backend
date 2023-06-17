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

      wishlist.belongsTo(models.ingredient, { foreignKey: "ingredient_id" });

    }

  }
  wishlist.init({

    id: {

      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {

      type: DataTypes.INTEGER,
      allowNull: false,

    },

    ingredient_id: {

      type: DataTypes.INTEGER,
      allowNull: false,

    },

    is_favorite: {

      type: DataTypes.INTEGER,
      defaultValue: 1

    },


  }, {
    sequelize,

    modelName: 'wishlist',
    timestamps: false,
    indexes: [{

      unique: true,
      fields: ["user_id", "ingredient_id"]

    }],
    defaultScope: {

      attributes: {
        exclude: ["user_id", "ingredient_id"]
      }

    }
  });
  return wishlist;
};