'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stanje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Skladiste, Proizvod}) {
      this.belongsTo(Skladiste,{
        foreignKey: 'skladisteID',
        as: 'skladiste'
      });
      this.belongsTo(Proizvod,{
        foreignKey: 'proizvodID',
        as: 'proizvod'
      });
    }
  }
  Stanje.init({
    kolicina: DataTypes.INTEGER,
    skladisteID: DataTypes.INTEGER,
    proizvodID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stanje',
  });
  return Stanje;
};