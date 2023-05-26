'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wishlists', {
      
      id:{

        type:Sequelize.UUID,
        allowNull:false,        
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
      },
      user_id:{

        type:Sequelize.UUID,
        allowNull:false,

      },
  
      ingredient_id:{

        type:Sequelize.UUID,
        allowNull:false,

      },
    


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wishlists');
  }
};