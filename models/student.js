const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')

const { CreateStudentValidator } = require('../validators/validator')
const { STRING } = require('sequelize')

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
  nickName: {
    type: Sequelize.STRING
  },
  //学员编号
  code: {
    type: Sequelize.STRING,
  },
  //联系方式（手机
  mobile: {
    type: Sequelize.INTEGER
  },
  //学员微信
  wechat: {
    type: Sequelize.STRING
  },
  //学员性别
  sex: {
    type: Sequelize.INTEGER
  },
  birthday: {
    type: Sequelize.DATE
  }
}, { sequelize, tableName: 'student' })


module.exports = { Student }