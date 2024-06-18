'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proizvod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Stanje,Recenzija,Stavka,Kategorija}) {
      this.hasMany(Stanje,{
        foreignKey: 'proizvodID',
        as: 'stanje'
      }
      /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);
      this.hasMany(Recenzija,{
        foreignKey: 'proizvodID',
        as: 'recenzija'
      }
      /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);

      this.hasMany(Stavka,{
        foreignKey: 'proizvodID',
        as: 'stavka'
      },
      /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);


      this.belongsTo(Kategorija,{
        foreignKey: 'kategorijaID',
        as: 'kategorija'
      });
    }
  }
  Proizvod.init({
    naziv: DataTypes.STRING,
    cena: DataTypes.INTEGER,
    kategorijaID: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Proizvod',
  });
  return Proizvod;
};