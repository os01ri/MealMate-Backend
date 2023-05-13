'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe.init({
    
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
    description:{

        type:DataTypes.INTEGER,
        allowNull:false
    },
    time:{

        type:DataTypes.STRING,
        allowNull:false
    },
    url:{

      type:DataTypes.STRING,
      allowNull:true

    }



  }, {
    sequelize,
    modelName: 'recipe',
    timestamps:false
  });
  return recipe;
};