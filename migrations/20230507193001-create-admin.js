'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('admins', {

            id: {

                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {

                type: Sequelize.STRING,
                allowNull: false
            },
            username: {

                type: Sequelize.STRING,
                allowNull: false
            },
            email: {

                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            code: {

                type: Sequelize.STRING,
                allowNull: true

            },
            password: {

                type: Sequelize.STRING,
                allowNull: false,

                set(value) {

                    this.setDataValue("password", bcrypt.hashSync(value, 10));
                },


            },
            logo: {

                type: Sequelize.STRING,
                allowNull: true
            },
            hash: {

                type: Sequelize.STRING,
                allowNull: true
            },
            is_superAdmin: {

                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            role_id: {

                type: Sequelize.INTEGER,
                allowNull: false,
                references: {

                    model: "roles",
                    key: "id"

                },
                onUpdate: "cascade"
            }


        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('admins');
    }
};