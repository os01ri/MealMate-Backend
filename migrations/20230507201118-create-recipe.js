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

          type:Sequelize.STRING,
          allowNull:false
      },
      time:{

          type:Sequelize.STRING,
          allowNull:false
      },
      url:{

        type:Sequelize.STRING,
        allowNull:true

      },
      type_id:{

        type:Sequelize.UUID,
        allowNull:false,
        references:{
            model:"types",
            key:"id"
            
        },
        onUpdate:"cascade",
        onDelete:"cascade"
  
      },
  
      category_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
            model:"categories",
            key:"id"          
        },
        onUpdate:"cascade",
        onDelete:"cascade"
      },
  


    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};