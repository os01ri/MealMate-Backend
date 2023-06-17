'use strict';
const db = require("../models/index");
const permission = require("../config/permission");
module.exports = {
  async up(queryInterface, Sequelize) {



    let role = await db.role.create({

      name: "SuperAdmin",
      permission
    });

    let admin = await db.admin.create({

      name: "ali hmaidi",
      username: "admin",
      email: "alihmaidi019@gmail.com",
      password: "ali450892",
      role_id: role.id,
      is_superAdmin: true
    })





  },

  async down(queryInterface, Sequelize) {


  }
};
