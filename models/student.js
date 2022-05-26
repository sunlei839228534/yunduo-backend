const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')


class Student extends Model {

}

Student.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  nickname: {
    type: Sequelize.STRING
  },
}, { sequelize, tableName: 'student' })

module.exports = { Student }