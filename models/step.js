'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      step.belongsTo(models.recipe, { foreignKey: "recipe_id" })
    }
  }
  step.init({

    id: {

      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {

      type: DataTypes.STRING,
      allowNull: false
    },
    rank: {

      type: DataTypes.INTEGER,
      allowNull: false
    },

    description: {

      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipe_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recipe",
        key: "id"

      },
      onUpdate: "cascade",
      onDelete: "cascade"

    }

  }, {
    sequelize,
    modelName: 'step',
    timestamps: false,
    defaultScope: {

      attributes: {

        exclude: ["recipe_id"]
      }
    }
  });
  return step;
};