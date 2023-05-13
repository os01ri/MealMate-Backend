'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {

    static associate(models) {
      // define association here
    }
  }
  type.init({

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
    modelName: 'type',
    timestamps:false
  });
  return type;
};