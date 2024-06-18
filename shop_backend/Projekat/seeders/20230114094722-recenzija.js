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
    await queryInterface.bulkInsert('recenzijas', 
    [
      {id:"1",ocena:"5",opis:"Odlicne slusalice",proizvodID:"300",korisnikID:"1001"},
      {id:"2",ocena:"3",opis:"Nije toliko los laptop",proizvodID:"303",korisnikID:"1002"},
      {id:"3",ocena:"4",opis:"Solidna tastatura",proizvodID:"301",korisnikID:"1003"},
      {id:"4",ocena:"5",opis:"Telefon sa odlicnom kamerom",proizvodID:"304",korisnikID:"1004"},
      {id:"5",ocena:"5",opis:"Najbolji telefon",proizvodID:"305",korisnikID:"1005"}
      
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
