'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category1.hasMany(models.ingredient,{foreignKey:"category_id"})
    
    }
  }
  category1.init({
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
  },
  url:{

      type:DataTypes.STRING,
      allowNull:true

  }
  }, {
    sequelize,
    modelName: 'category1',
    timestamps:false
  });
  return category1;
};