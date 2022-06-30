'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.changeColumn('Offers', 'accepted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
      })

  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.changeColumn('Offers', 'accepted', {
      type: Sequelize.BOOLEAN,
      
      })

  }
};
