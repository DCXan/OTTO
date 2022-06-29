'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.addColumn('carRequests', 'fulfilled', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
      })

  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.removeColumn('carRequests', 'fulfilled')

  }
};
