'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('groceries', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false,

      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      user_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },

      ingredient_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('groceries');
  }
};