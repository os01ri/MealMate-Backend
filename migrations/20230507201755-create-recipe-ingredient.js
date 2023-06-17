'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_ingredients', {
      id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      recipe_id: {

        type: Sequelize.INTEGER,
        allowNull: false
      },
      ingredient_id: {

        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {

        type: Sequelize.DOUBLE,
        allowNull: false
      },

      unit_id: {

        type: Sequelize.INTEGER,
        allowNull: false
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe_ingredients');
  }
}; 