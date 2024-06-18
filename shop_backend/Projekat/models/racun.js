'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Racun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Stavka, Korisnik, Prodavnica}) {
      this.hasMany(Stavka,{
        foreignKey: 'racunID',
        as: 'stavka'
      },
      {
        // onDelete: 'cascade', 
        // hooks:true
      });

      this.belongsTo(Korisnik,{
        foreignKey: 'korisnikID',
        as: 'korisnik'
      });
      this.belongsTo(Prodavnica,{
        foreignKey: 'prodavnicaID',
        as: 'prodavnica'
      });
    }
  }
  Racun.init({
    ukupnaCena: DataTypes.INTEGER,
    datum: DataTypes.STRING,
    korisnikID: DataTypes.INTEGER,
    prodavnicaID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Racun',
  });
  return Racun;
};