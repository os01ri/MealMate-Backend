'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");


module.exports = (sequelize, DataTypes) => {



  class admin extends Model {

    static associate(models) {
      this.belongsTo(models.role, { foreignKey: "role_id" });

    }

  }


  admin.prototype.comparePassword = function (password) {

    return bcrypt.compareSync(password, this.password);
  }


  admin.prototype.toJSON = function () {

    const values = this.get();
    delete values.password;
    delete values.role_id;
    delete values.code;
    return values;

  }

  admin.init({

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
    username: {

      type: DataTypes.STRING,
      allowNull: false
    },
    email: {

      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {

      type: DataTypes.STRING,
      allowNull: true

    },
    is_superAdmin: {

      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: true,
      defaultValue: false

    },
    password: {

      type: DataTypes.STRING,
      allowNull: false,
      set(value) {

        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },


    },
    logo: {

      type: DataTypes.STRING,
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_id: {

      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id"

      },
      onUpdate: "cascade"
    }


  }, {
    sequelize,
    modelName: 'admin',
    timestamps: false,
    defaultScope: {

      attributes: {

        exclude: ["is_superAdmin"]
      }

    }

  });
  return admin;
};