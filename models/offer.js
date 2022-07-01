"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Offer.belongsTo(models.carRequest, {
        foreignKey: "requestID",
        onDelete: "CASCADE",
        hooks: true,
      })
    }
  }
  Offer.init(
    {
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      year: DataTypes.INTEGER,
      color: DataTypes.STRING,
      mileage: DataTypes.INTEGER,
      offerPrice: DataTypes.INTEGER,
      dealerID: DataTypes.INTEGER,
      customerID: DataTypes.INTEGER,
      requestID: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Offer",
    }
  )
  return Offer
}
