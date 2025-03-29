const { DataTypes, DATE, fn} = require('sequelize')
const {sequelize} = require("../util/db");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isAfter: "1991-01-01",
        isBefore: "2025-12-31",
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}