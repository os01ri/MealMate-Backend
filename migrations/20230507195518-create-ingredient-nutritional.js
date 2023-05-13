'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ingredient_nutritionals', {
      
    id:{

        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    ingredient_id:{

        type:Sequelize.UUID,
        allowNull:false
    },
    nutritional_id:{

        type:Sequelize.UUID,
        allowNull:false
    }

  

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ingredient_nutritionals');
  }
};