var Sequelize = require('sequelize');

var BetMax = (sequelize, type) => {
  return sequelize.define('betmax', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    count: Sequelize.INTEGER,
    betarr: Sequelize.STRING,
  })
}

module.exports = BetMax;