const Sequelize = require('sequelize')

let LottoExpressOdds = (sequelize, type) => {
    return sequelize.define('LottoExpressOdds', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        odd: Sequelize.STRING,
    })
}

module.exports = LottoExpressOdds

















