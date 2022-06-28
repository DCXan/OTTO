'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init({
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    color: DataTypes.STRING,
    mileage: DataTypes.INTEGER,
    dealerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};