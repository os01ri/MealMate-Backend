'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order.belongsToMany(models.ingredient, { through: "orderitem", foreignKey: "order_id", otherKey: "ingredient_id" })
      order.hasMany(models.orderitem, { foreignKey: "order_id" })
      order.belongsTo(models.user, { foreignKey: "user_id" })
    }
  }


  order.prototype.toJSON = function () {

    const values = this.get();
    delete values.updatedAt;
    delete values.user_id;
    return values;

  }
  order.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    user_id: {

      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id"

      },

    },
    totalPrice: {

      type: DataTypes.DOUBLE,
      allowNull: true,

    },

    status: {

      type: DataTypes.INTEGER,
      defaultValue: 1

    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  }, {
    sequelize,
    modelName: 'order',
    timestamps: true
  });
  return order;
};