'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unlikerecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"

        },

      },


      recipe_id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "recipes",
          key: "id"

        },

      },


    },
      {


        uniqueKeys: {

          unique_tag: {

            fields: ["recipe_id", "user_id"]
          }

        }

      }

    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('unlikerecipes');
  }
};