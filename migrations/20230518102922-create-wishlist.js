'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wishlists', {

      id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      user_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },

      ingredient_id: {

        type: Sequelize.INTEGER,
        allowNull: false,

      },


      is_favorite: {

        type: Sequelize.INTEGER,
        defaultValue: 1

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
    await queryInterface.dropTable('wishlists');
  }
};