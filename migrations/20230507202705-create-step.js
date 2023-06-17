'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('steps', {

      id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {

        type: Sequelize.STRING,
        allowNull: false
      },
      description: {

        type: Sequelize.STRING,
        allowNull: false
      },
      rank: {

        type: Sequelize.INTEGER,
        allowNull: false
      },
      recipe_id: {

        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "recipes",
          key: "id"

        },
        onUpdate: "cascade",
        onDelete: "cascade"

      }




    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('steps');
  }
};