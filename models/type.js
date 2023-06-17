'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {

    static associate(models) {
      // define association here
      type.hasMany(models.recipe, { foreignKey: "type_id" })
    }
  }
  type.init({

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
    },
    url: {

      type: DataTypes.STRING,
      allowNull: true

    },
    hash: {

      type: DataTypes.STRING,
      allowNull: true

    }



  }, {
    sequelize,
    modelName: 'type',
    timestamps: false
  });
  return type;
};