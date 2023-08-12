'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likerecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },

      recipe_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likerecipes');
  }
};