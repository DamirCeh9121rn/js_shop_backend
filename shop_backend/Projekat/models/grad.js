'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Prodavnica}) {
      this.hasMany(Prodavnica,{
          foreignKey:'gradID',
          as:'prodavnica'
      },{
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Grad.init({
    ime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grad',
  });
  return Grad;
};