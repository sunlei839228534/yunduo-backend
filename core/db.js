const Sequelize = require('sequelize')
const { database } = require('../config/config')

const { dbName, user, prot, password, host } = database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  prot,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
})

sequelize.sync({
  focus: false
})

module.exports = {
  sequelize
}