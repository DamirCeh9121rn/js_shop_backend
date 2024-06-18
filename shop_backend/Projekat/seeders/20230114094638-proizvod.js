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
    await queryInterface.bulkInsert('proizvods', 
    [
      {id:"300",naziv:"Jbl 230",cena:"10000",kategorijaID:"1"},
      {id:"301",naziv:"Hyperx alloy",cena:"12000",kategorijaID:"2"},
      {id:"302",naziv:"Hyperx pulsefire",cena:"9000",kategorijaID:"3"},
      {id:"303",naziv:"Asus vivobook",cena:"120000",kategorijaID:"5"},
      {id:"304",naziv:"Samsung galaxy s21",cena:"90000",kategorijaID:"6"},
      {id:"305",naziv:"Iphone 14",cena:"1500000",kategorijaID:"6"},
      {id:"306",naziv:"Huawei mateview",cena:"35000",kategorijaID:"4"},
      {id:"307",naziv:"PHILIPS 12 SMART",cena:"56000",kategorijaID:"7"}
      
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
