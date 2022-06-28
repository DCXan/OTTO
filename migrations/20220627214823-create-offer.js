'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      mileage: {
        type: Sequelize.INTEGER
      },
      offerPrice: {
        type: Sequelize.INTEGER
      },
      dealerID: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', field: 'id'}
      },
      customerID: {
        type: Sequelize.INTEGER,
        references: { model: 'carRequests', field: 'customerID'}
      },
      requestID: {
        type: Sequelize.INTEGER,
        references: { model: 'carRequests', field: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offers');
  }
};