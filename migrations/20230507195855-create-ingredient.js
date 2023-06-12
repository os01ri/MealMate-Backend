'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ingredients', {
      
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
      price:{

        type:Sequelize.DOUBLE,
        allowNull:false,
        
      },


      url:{

        type:Sequelize.STRING,
        allowNull:false,
        
      },
      unit_id:{

        type:Sequelize.INTEGER,
        allowNull:false,

      },
      category_id:{
        type:Sequelize.UUID,
        allowNull:false,

      },
      price_by:{

        type:Sequelize.DOUBLE,
        allowNull:false,

      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ingredients');
  }
};