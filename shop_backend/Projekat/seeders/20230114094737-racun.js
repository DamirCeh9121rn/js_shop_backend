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
    await queryInterface.bulkInsert('racuns', 
    [
      {id:"501",ukupnaCena:"20000",datum:"31.12.2022.",korisnikID:"1001",prodavnicaID:"101"},
      {id:"502",ukupnaCena:"120000",datum:"12.1.2022.",korisnikID:"1002",prodavnicaID:"101"},
      {id:"503",ukupnaCena:"90000",datum:"1.1.2023.",korisnikID:"1003",prodavnicaID:"102"},
      {id:"504",ukupnaCena:"56000",datum:"2.2.2021.",korisnikID:"1004",prodavnicaID:"106"},
      {id:"505",ukupnaCena:"22000",datum:"18.3.2022.",korisnikID:"1005",prodavnicaID:"105"},
      {id:"506",ukupnaCena:"21000",datum:"24.11.2022.",korisnikID:"1006",prodavnicaID:"104"}

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
