'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {

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

      number_cooked: {

        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      


      ordered_count: {

        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      
      rate_count: {

        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },

      
      rate_avg: {

        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      feeds: {

        type: Sequelize.INTEGER,
      },
      description: {

        type: Sequelize.TEXT,
        allowNull: false
      },
      time: {

        type: Sequelize.STRING,
        allowNull: false
      },
      time: {

        type: Sequelize.STRING,
        allowNull: false
      },
      url: {

        type: Sequelize.STRING,
        allowNull: true

      },

      hash: {

        type: Sequelize.STRING,
        allowNull: true

      },
      status: {

        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false

      },

      user_id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"

        },

      },
      type_id: {

        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "types",
          key: "id"

        },
        onUpdate: "cascade",
        onDelete: "cascade"

      },

      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },



    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};