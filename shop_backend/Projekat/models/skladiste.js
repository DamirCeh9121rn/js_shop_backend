'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skladiste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Stanje,Prodavnica}) {
      this.hasMany(Stanje,{
        foreignKey: 'skladisteID',
        as: 'stanje'
      }
      /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);
      this.belongsTo(Prodavnica,{
        foreignKey: 'prodavnicaID',
        as: 'prodavvnica'
      });
    }
  }
  Skladiste.init({
    adresa: DataTypes.STRING,
    prodavnicaID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Skladiste',
  });
  return Skladiste;
};