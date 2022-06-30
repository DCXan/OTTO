'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.carRequest.hasMany(models.Offer, { as: 'offers', foreignKey: 'customerID'})
    }
  }
  carRequest.init({
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    minYear: DataTypes.INTEGER,
    maxYear: DataTypes.INTEGER,
    color: DataTypes.STRING,
    maxMileage: DataTypes.INTEGER,
    maxPrice: DataTypes.INTEGER,
    customerID: DataTypes.INTEGER,
    fulfilled: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'carRequest',
  });
  return carRequest;
};