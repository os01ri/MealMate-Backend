'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('steps', {
      
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
    rank:{

        type:Sequelize.INTEGER,
        allowNull:false
    },
    recipe_id:{

      type:Sequelize.UUID,
      allowNull:false,
      references:{
          model:"recipes",
          key:"id"
          
      },
      onUpdate:"cascade",
      onDelete:"cascade"

    }




    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('steps');
  }
};