'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      orderitem.belongsTo(models.unit,{foreignKey:"unit_id"})

    }
  }


  orderitem.prototype.toJSON=function(){

    const values=this.get();
    delete values.order_id;
    delete values.ingredient_id;
    return values;

  }

  orderitem.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull:false
    },

    order_id:{

      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
          model:"orders",
          key:"id"
          
      },
      
    },
    unit_id:{

      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
          model:"units",
          key:"id"
          
      },
      
    },
    price:{

      type:DataTypes.INTEGER,
      allowNull:true,

    },
    ingredient_id:{

      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
          model:"ingredients",
          key:"id"
          
      },
      
    },


  }, {
    sequelize,
    modelName: 'orderitem',
    timestamps:false,
    
  });
  return orderitem;
};