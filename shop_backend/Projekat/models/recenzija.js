'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recenzija extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Proizvod, Korisnik}) {
      this.belongsTo(Proizvod,{ foreignKey: 'proizvodID', as: 'proizvod'});
      this.belongsTo(Korisnik,{ foreignKey: 'korisnikID', as: 'korisnik'});
    }
  }
  Recenzija.init({
    ocena: DataTypes.INTEGER,
    opis: DataTypes.STRING,
    proizvodID: DataTypes.INTEGER,
    korisnikID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recenzija',
  });
  return Recenzija;
};