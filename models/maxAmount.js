const Sequelize = require('sequelize')

let maxAmount = (sequelize, type) => {
    return sequelize.define('maxAmount', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        type: Sequelize.STRING,
        value: Sequelize.STRING,
    }, {
        timestamps: false
    })
}

module.exports = maxAmount


 

