'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      url: {

        type: Sequelize.STRING,
        allowNull: true

      },
      hash: {

        type: Sequelize.STRING,
        allowNull: true

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};