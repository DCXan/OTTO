"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Offers", "accepted", {
      type: Sequelize.BOOLEAN,
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("Offers", "accepted")
  },
}
