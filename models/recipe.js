'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      recipe.belongsTo(models.category, { foreignKey: "category_id" })
      recipe.belongsTo(models.type, { foreignKey: "type_id" })
      recipe.belongsTo(models.user, { foreignKey: "user_id" })

      recipe.hasMany(models.step, { foreignKey: "recipe_id" })
      recipe.belongsToMany(models.ingredient, { through: "recipe_ingredient", foreignKey: "recipe_id", otherKey: "ingredient_id" })
    }
  }
  recipe.init({

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

    
    number_cooked: {

      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    
    description: {

      type: DataTypes.TEXT,
      allowNull: false
    },

    // ordered_count: {

    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue:0
    // },
    
    rate_count: {

      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },

    
    rate_avg: {

      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    time: {

      type: DataTypes.STRING,
      allowNull: false
    },
    url: {

      type: DataTypes.STRING,
      allowNull: true

    },

    feeds: {

      type: DataTypes.INTEGER,
      allowNull: true

    },

    hash: {

      type: DataTypes.STRING,
      allowNull: true

    },
    status: {

      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false

    },

    type_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "type",
        key: "id"

      },
      onUpdate: "cascade",
      onDelete: "cascade"

    },

    user_id: {

      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id"

      },

    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "category",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },

  }, {
    sequelize,
    modelName: 'recipe',
    timestamps: false,
    scopes:{

      status(status){

        if(status==undefined){

          return {}
        }

        return {

          where:{

            status
          }
        };
        

      },

      category(id){

        if(id==undefined){

          return {


          }
        }
       
        return {

          where:{

            category_id:id
          }
        };
       

      },


      name(name){

        if(name==undefined){

          return {};

        }

        return {

          where: {
            name: {

              [Op.like]: `%${name}%`
            }
          }



        };


      }






    }
  });
  return recipe;
};