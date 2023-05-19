'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grocery.belongsTo(models.ingredient,{foreignKey:"ingredient_id"})
    }
  }
  grocery.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity:{
      type: DataTypes.DOUBLE,
      allowNull: false,

    },

    user_id:{

      type:DataTypes.UUID,
      allowNull:false,

    },

    ingredient_id:{

      type:DataTypes.UUID,
      allowNull:false,

    },



  }, {
    sequelize,
    modelName: 'grocery',
    timestamps:false,
    defaultScope:{

      attributes:{
        exclude:["user_id","ingredient_id"]
      }
    }
  });
  return grocery;
};