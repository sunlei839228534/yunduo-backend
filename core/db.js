const Sequelize = require('sequelize')
const { database } = require('../config/config')

const { dbName, user, port, password, host } = database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'created_at', 'deleted_at']
        }
      }
    }
  }
})

sequelize.sync({
  focus: true
})

module.exports = {
  sequelize
}