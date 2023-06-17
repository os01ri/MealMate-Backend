'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.admin, { foreignKey: "role_id" })

    }
  }
  role.init({
    id: {

      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    name: {

      type: DataTypes.STRING,
      allowNull: false
    },
    permission: {

      allowNull: false,
      type: DataTypes.TEXT,
      set(value) {
        this.setDataValue("permission", JSON.stringify(value));
      },

      get() {

        return JSON.parse(this.getDataValue("permission"));
      }
    }


  }, {
    sequelize,
    modelName: 'role',
    timestamps: false
  });
  return role;
};