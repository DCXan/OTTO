'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return [
      queryInterface.removeColumn('Offers', 'customerID'),

      queryInterface.addColumn('Offers', 'customerID', {
        type: Sequelize.INTEGER,
        references: { model: 'Users', field: 'id'}
        })


    ]
  },

  async down (queryInterface, Sequelize) {
    
    return [
      queryInterface.addColumn('Offers', 'customerID'),

      queryInterface.removeColumn('Offers', 'customerID', {
        type: Sequelize.INTEGER,
        references: { model: 'Users', field: 'id'}
        })


    ]

  }
};
