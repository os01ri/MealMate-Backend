'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unlikes', {
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


      ingredient_id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "ingredients",
          key: "id"

        },

      },
    }, {


      uniqueKeys: {

        unique_tag: {

          fields: ["ingredient_id", "user_id"]
        }

      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('unlikes');
  }
};