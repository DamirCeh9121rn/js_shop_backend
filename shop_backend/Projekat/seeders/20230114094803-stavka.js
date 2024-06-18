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
    await queryInterface.bulkInsert('stavkas', 
    [
      {id:"101",kolicina:"2",cena:"20000",proizvodID:"300",racunID:"501"},
      {id:"201",kolicina:"1",cena:"120000",proizvodID:"303",racunID:"502"},
      {id:"301",kolicina:"1",cena:"90000",proizvodID:"304",racunID:"503"},
      {id:"401",kolicina:"1",cena:"10000",proizvodID:"300",racunID:"505"},
      {id:"402",kolicina:"1",cena:"12000",proizvodID:"301",racunID:"505"},
      {id:"501",kolicina:"1",cena:"56000",proizvodID:"307",racunID:"504"},
      {id:"601",kolicina:"1",cena:"12000",proizvodID:"301",racunID:"506"},
      {id:"602",kolicina:"1",cena:"9000",proizvodID:"302",racunID:"506"}
      
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
