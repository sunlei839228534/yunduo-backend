const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')

const { CreateStudentValidator } = require('../validators/validator')


class Course extends Model { }

Course.init({

}, {
  sequelize,
  tableName: 'course'
})

module.exports = { Course }