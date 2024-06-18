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
    await queryInterface.bulkInsert('skladistes', 
    [
      {id:"11",adresa:"Bulevar kralja Aleksandra 196",prodavnicaID:"101"},
      {id:"12",adresa:"Zaplanjska 32",prodavnicaID:"101"},
      {id:"13",adresa:"Bezanijska 51",prodavnicaID:"101"},
      {id:"21",adresa:"Zmaj Jovina 25",prodavnicaID:"102"},
      {id:"31",adresa:"Dimitrija Tucovica 4",prodavnicaID:"103"},
      {id:"41",adresa:"Svetozara Markovica 40",prodavnicaID:"104"},
      {id:"51",adresa:"Bulevar Medijana 15",prodavnicaID:"105"},
      {id:"32",adresa:"Bulevar oslobodjenja 119",prodavnicaID:"106"},
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
