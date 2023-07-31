'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      follower_id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"

        },

      },

      
      followby_id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"

        },

      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};