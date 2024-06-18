'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stavkas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kolicina: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      proizvodID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      racunID:{
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
    await queryInterface.dropTable('Stavkas');
  }
};