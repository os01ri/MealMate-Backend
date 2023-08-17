'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ingredient_nutritionals', {

      id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      ingredient_id: {

        type: Sequelize.INTEGER,
        allowNull: false
      },
      nutritional_id: {

        type: Sequelize.INTEGER,
        allowNull: false
      },
      value: {

        type: Sequelize.INTEGER,
        allowNull: false

      },

      unit_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },


      precent: {

        type: Sequelize.INTEGER,
        allowNull: false

      },



    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ingredient_nutritionals');
  }
};