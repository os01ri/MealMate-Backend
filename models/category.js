'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      category.hasMany(models.recipe,{foreignKey:"category_id"})

    }
  }
  category.init({
    
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
    timestamps:false,
    modelName: 'category',
  });
  return category;
};