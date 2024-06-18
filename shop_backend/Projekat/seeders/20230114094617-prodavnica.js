'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('prodavnicas', 
      [
        {id:"101",ime:"Gigatron",gradID:"1"},
        {id:"102",ime:"Tehnomanija",gradID:"4"},
        {id:"103",ime:"Win win",gradID:"5"},
        {id:"104",ime:"Emmi",gradID:"3"},
        {id:"105",ime:"Tehnomedia",gradID:"2"},
        {id:"106",ime:"Gigatron",gradID:"4"}
      ], {});
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
