'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stavka extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Racun, Proizvod}) {
      this.belongsTo(Racun,{
        foreignKey: 'racunID',
        as: 'racun'
      });
      this.belongsTo(Proizvod,{
        foreignKey: 'proizvodID',
        as: 'proizvod'
      });
    }
  }
  Stavka.init({
    kolicina: DataTypes.INTEGER,
    cena: DataTypes.INTEGER,
    racunID: DataTypes.INTEGER,
    proizvodID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Stavka',
  });
  return Stavka;
};