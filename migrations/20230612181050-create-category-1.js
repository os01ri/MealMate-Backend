'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category1s', {
      id:{

        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    name:{

        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    url:{

        type:Sequelize.STRING,
        allowNull:true

    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category1s');
  }
};