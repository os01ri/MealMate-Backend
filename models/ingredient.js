'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ingredient.belongsToMany(models.nutritional, { through: "ingredient_nutritionals", foreignKey: "ingredient_id", otherKey: "nutritional_id" })
      ingredient.belongsToMany(models.recipe, { through: "recipe_ingredient", foreignKey: "ingredient_id", otherKey: "recipe_id" })
      ingredient.belongsToMany(models.user, { through: "wishlist", foreignKey: "ingredient_id", otherKey: "user_id" })
      ingredient.belongsToMany(models.user, { through: "grocery", foreignKey: "ingredient_id", otherKey: "user_id", as: "groceries" })
      ingredient.belongsToMany(models.order, { through: "orderitem", foreignKey: "ingredient_id", otherKey: "order_id" })

      ingredient.belongsTo(models.unit, { foreignKey: "unit_id" })
      ingredient.belongsTo(models.category1, { foreignKey: "category_id" })

      ingredient.hasMany(models.wishlist, { foreignKey: "ingredient_id" })
      ingredient.hasMany(models.grocery, { foreignKey: "ingredient_id" })

    }
  }
  ingredient.init({

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
    price: {

      type: DataTypes.DOUBLE,
      allowNull: false,

    },

    url: {

      type: DataTypes.STRING,
      allowNull: false,

    },

    hash: {

      type: DataTypes.STRING,
      allowNull: false,

    },
    unit_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Units",
        key: "id"

      },

    },
    category_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category1s",
        key: "id"

      },
      onDelete: "cascade",
      onUpdate: "cascade"

    },
    price_by: {

      type: DataTypes.DOUBLE,
      allowNull: false,

    }

  }, {
    sequelize,
    modelName: 'ingredient',
    defaultScope: {

      attributes: {

        exclude: ["unit_id", "category_id"]
      }

    },
    scopes: {

      category(id) {

        if (id == undefined) {

          return {
          }


        }

        return {
          where: {

            category_id: id

          }

        }
      },


      // nutritionals(ids) {

      //   if (ids == undefined) {

      //     return {
      //     }


      //   }

      //   return {

      //     include:[

      //       {model:db.nutritional,where:{}}

      //     ]

      //   }
      // },


      // name(name) {

      //   if (name != undefined) {

      //     return {

      //       where: {
      //         name: {

      //           [Sequelize.Op.eq]: `name`
      //         }
      //       }

      //     }

      //   }
      //   return {}


      // }

    },
    timestamps: false
  });

  return ingredient;
};