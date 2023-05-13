'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      
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
      description:{

          type:Sequelize.INTEGER,
          allowNull:false
      },
      time:{

          type:Sequelize.STRING,
          allowNull:false
      },
      url:{

        type:Sequelize.STRING,
        allowNull:true

      }


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};