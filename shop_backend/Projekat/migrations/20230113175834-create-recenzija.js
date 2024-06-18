'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recenzijas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ocena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      opis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      proizvodID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      korisnikID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recenzijas');
  }
};