'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_ingredients', {
      id:{

        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      recipe_id:{
  
          type:Sequelize.UUID,
          allowNull:false
      },
      ingredient_id:{
  
        type:Sequelize.UUID,
        allowNull:false
      },
      quantity:{
  
        type:Sequelize.DOUBLE,
        allowNull:false
      },
      

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe_ingredients');
  }
};