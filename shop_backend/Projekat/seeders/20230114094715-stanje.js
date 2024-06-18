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
    await queryInterface.bulkInsert('stanjes', 
      [
        {id:"1",kolicina:"10",skladisteID:"11",proizvodID:"300"},
        {id:"2",kolicina:"4",skladisteID:"12",proizvodID:"307"},
        {id:"3",kolicina:"15",skladisteID:"13",proizvodID:"302"},
        {id:"4",kolicina:"3",skladisteID:"21",proizvodID:"303"},
        {id:"5",kolicina:"12",skladisteID:"31",proizvodID:"304"},
        {id:"6",kolicina:"20",skladisteID:"41",proizvodID:"301"},
        {id:"7",kolicina:"13",skladisteID:"51",proizvodID:"305"},
        {id:"8",kolicina:"2",skladisteID:"32",proizvodID:"306"},
        {id:"9",kolicina:"4",skladisteID:"11",proizvodID:"303"}
        
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
