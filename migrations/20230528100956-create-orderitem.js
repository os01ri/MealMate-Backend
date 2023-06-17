'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderitems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },

      order_id: {

        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id"

        },

      },
      unit_id: {

        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "units",
          key: "id"

        },

      },
      price: {


        type: Sequelize.INTEGER,
        allowNull: true,


      },
      ingredient_id: {

        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ingredients",
          key: "id"

        },

      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderitems');
  }
};