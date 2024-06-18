'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Racuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ukupnaCena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      datum: {
        type: Sequelize.STRING,
        allowNull: false
      },
      korisnikID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      prodavnicaID:{
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
    await queryInterface.dropTable('Racuns');
  }
};