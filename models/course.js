const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')

const { CreateStudentValidator } = require('../validators/validator')


class Course extends Model {
  static async queryCourse(config = {}) {
    const courses = await Course.findAll({
      attributes: [
        'id', 'name', 'teachingMode', 'chargeMode', 'chargeStandard'
      ]
    })
    return courses
  }
}

Course.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
  },
  teachingMode: Sequelize.INTEGER,
  chargeMode: Sequelize.INTEGER,
  chargeStandard: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'course'
})

module.exports = { Course }