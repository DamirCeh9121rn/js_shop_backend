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
    await queryInterface.bulkInsert('kategorijas', 
      [
        {id:"1",naziv:"Slusalice"},
        {id:"2",naziv:"Tastatura"},
        {id:"3",naziv:"Mis"},
        {id:"4",naziv:"Monitor"},
        {id:"5",naziv:"Laptop"},
        {id:"6",naziv:"Telefon"},
        {id:"7",naziv:"Televizor"}
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
