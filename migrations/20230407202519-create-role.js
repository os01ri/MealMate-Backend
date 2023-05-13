'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      
      id:{
          type:Sequelize.UUID,
          defaultValue:Sequelize.UUIDV4,
          allowNull:false,
          primaryKey:true
      },
      
      name:{

          type:Sequelize.STRING,
          allowNull:false
      },
      permission:{

          allowNull:false,
          type:Sequelize.TEXT,
          set(value){
              this.setDataValue("permission",JSON.stringify(value));
          },

          get(){

              return JSON.parse(this.getDataValue("permission"));
          }
      }


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};