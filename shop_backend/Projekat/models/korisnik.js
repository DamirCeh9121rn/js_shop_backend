'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Korisnik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Recenzija,Racun}) {
      this.hasMany(Recenzija,{
        foreignKey: 'korisnikID',
        as: 'recenzija'
      }
      /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);
      this.hasMany(Racun,{
        foreignKey: 'korisnikID',
        as: 'racun'
      }
      /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);
    }
  }
  Korisnik.init({
    ime: DataTypes.STRING,
    prezime: DataTypes.STRING,
    email: DataTypes.STRING,
    sifra: DataTypes.STRING,
    tip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Korisnik',
  });
  return Korisnik;
};