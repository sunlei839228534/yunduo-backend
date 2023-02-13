const { sequelize } = require('../core/db')
const { Sequelize, Model, DataTypes } = require('sequelize')

class Teacher extends Model {

}

Teacher.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //老师名称
  name: {
    type: DataTypes.STRING
  },
  //老师联系方式
  phone: {
    type: DataTypes.STRING
  },
  //老师备注
  notes: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  tableName: 'teacher'
})

module.exports = { Teacher }