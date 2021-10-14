const Sequelize = require('sequelize')

let Bets = (sequelize, type) => {
    return sequelize.define('Bets', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: Sequelize.STRING,
        bet_id: Sequelize.STRING,
        amount: Sequelize.FLOAT,
        type: Sequelize.STRING,
        kind: Sequelize.STRING,
        odd: Sequelize.FLOAT,
        min_possibleWinning: Sequelize.FLOAT,
        max_possibleWinning: Sequelize.FLOAT,
        possibleWinning: Sequelize.FLOAT,
        staked: Sequelize.FLOAT,
        stakes: Sequelize.STRING,
        stakes1: Sequelize.STRING,
        stakes2: Sequelize.STRING,
        date: Sequelize.DATE,
        status: Sequelize.STRING
    })
}

module.exports = Bets


 

