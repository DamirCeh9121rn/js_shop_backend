'use strict';

const bcrypt = require('bcrypt');

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
    bcrypt.hashSync("",15)
    await queryInterface.bulkInsert('korisniks', 
    [
      {id:"1001",ime:"Marko",prezime:"Markovic",email:"mmarkovic@gmail.com",sifra:bcrypt.hashSync("marko123",15),tip:"KORISNIK"},
      {id:"1002",ime:"Petar",prezime:"Petrovic",email:"ppetrovic@gmail.com",sifra:bcrypt.hashSync("petar123",15),tip:"KORISNIK"},
      {id:"1003",ime:"Milica",prezime:"Jovanovic",email:"mjovanovic@gmail.com",sifra:bcrypt.hashSync("milica123",15),tip:"ADMIN"},
      {id:"1004",ime:"Jovana",prezime:"Jovanovic",email:"jjovanovic@gmail.com",sifra:bcrypt.hashSync("jovana123",15),tip:"MODERATOR"},
      {id:"1005",ime:"Mirko",prezime:"Mirkovic",email:"mmirkovic@gmail.com",sifra:bcrypt.hashSync("mirko123",15),tip:"KORISNIK"},
      {id:"1006",ime:"Milos",prezime:"Milosevic",email:"mmilosevic@gmail.com",sifra:bcrypt.hashSync("milos123",15),tip:"MODERATOR"},
      {id:"1007",ime:"Ana",prezime:"Stojkovic",email:"astojkovic@gmail.com",sifra:bcrypt.hashSync("ana123",15),tip:"KORISNIK"},
      {id:"1008",ime:"Stefan",prezime:"Stefanovic",email:"sstefanovic@gmail.com",sifra:bcrypt.hashSync("strefan123",15),tip:"KORISNIK"}
      
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
