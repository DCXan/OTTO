'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return [
      queryInterface.renameColumn('carRequests', 'year', 'minYear'),
      
      queryInterface.addColumn('carRequests', 'maxYear', {
      type: Sequelize.INTEGER
      })
  ]
  },

  async down (queryInterface, Sequelize) {
    
    return [
      queryInterface.renameColumn('carRequests', 'minYear', 'year'),
      
      queryInterface.removeColumn('carRequests', 'maxYear', {
      type: Sequelize.INTEGER
      })
  ]

  }
};
