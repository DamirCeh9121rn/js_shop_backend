'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prodavnica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Skladiste,Racun,Grad}) {
      this.belongsTo(Grad,{
        foreignKey: 'gradID',
        as: 'grad'
      });
      this.hasMany(Skladiste,{
        foreignKey: 'prodavnicaID',
        as: 'skladiste'
      },
      {
       // onDelete: 'cascade', 
       // hooks:true
      });
      this.hasMany(Racun,{
        foreignKey: 'prodavnicaID',
        as: 'racun'
      }
     /*{
        onDelete: 'cascade', 
        hooks:true
      }*/);
    }
  }
  Prodavnica.init({
    ime: DataTypes.STRING,
    gradID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prodavnica',
  });
  return Prodavnica;
};