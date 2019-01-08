const Sequelize = require('sequelize')

const { mysql } = require('../config')

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
})

module.exports = sequelize
