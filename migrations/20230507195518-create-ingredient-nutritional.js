'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ingredient_nutritionals', {
      
    id:{

        type:Sequelize.INTEGER,
        autoIncrement:true,
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
    },
    value:{

      type:Sequelize.INTEGER,
      allowNull:false

    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }

  

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ingredient_nutritionals');
  }
};