'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unit.hasMany(models.ingredient,{foreignKey:"unit_id"})
      unit.hasMany(models.ingredient_nutritional,{foreignKey:"unit_id"})
      unit.hasMany(models.grocery,{foreignKey:"unit_id"})
      unit.hasMany(models.orderitem,{foreignKey:"unit_id"})

    }
  }
  unit.init({
    
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    code: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    }
    
  }, {
    sequelize,
    modelName: 'unit',
    timestamps:false
  });
  return unit;
};