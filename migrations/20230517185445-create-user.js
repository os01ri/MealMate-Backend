'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id:{

        type:Sequelize.UUID,
        allowNull:false,        
        primaryKey:true,
        defaultValue:Sequelize.UUIDV4
    },
    name:{

        type:Sequelize.STRING,
        allowNull:false
    },
    email:{

        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    code:{

        type:Sequelize.STRING,
        allowNull:true

    },
    password:{

        type:Sequelize.STRING,
        allowNull:false,
        
        set(value){

            this.setDataValue("password",bcrypt.hashSync(value,10));
        },
        

    },
    logo:{

        type:Sequelize.STRING,
        allowNull:true
    },
    status:{

      type:Sequelize.BOOLEAN,
      defaultValue:false
  },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};