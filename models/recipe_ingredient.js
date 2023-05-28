'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class recipe_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe_ingredient.init({
    
    id:{

      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    recipe_id:{

        type:DataTypes.UUID,
        allowNull:false
    },
    ingredient_id:{

      type:DataTypes.UUID,
      allowNull:false
    },
    quantity:{

      type:DataTypes.DOUBLE,
      allowNull:false
    },
    unit_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
          model:"Units",
          key:"id"
          
      },

    },

  }, {
    sequelize,
    modelName: 'recipe_ingredient',
    timestamps:false,
    defaultScope:{

      attributes:{

        exclude:["recipe_id","ingredient_id"]
      },
      include:[db.unit]

    }
  });
  return recipe_ingredient;
};