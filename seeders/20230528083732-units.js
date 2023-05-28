'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    return queryInterface.bulkInsert("units",[

      {

        name:"كيلو غرام",
        code:"kg"

      },

      {

        name:"غرام",
        code:"g"

      },


      {

        name:"ليتر",
        code:"l"

      },


      {

        name:"ميلي ليتر",
        code:"ml"

      },


      
    ]);



    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
