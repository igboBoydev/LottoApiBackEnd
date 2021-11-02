const Sequelize = require('sequelize')

let nap_4 = (sequelize, type) => {
    return sequelize.define('nap_4', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        amount: Sequelize.STRING,
        dates: Sequelize.DATE,
    }, {
        timestamps: false
    })
}

module.exports = nap_4


 

