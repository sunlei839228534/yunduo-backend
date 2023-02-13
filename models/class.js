const { sequelize } = require('../core/db')
const { Sequelize, Model, DataTypes } = require('sequelize')

class Class extends Model {
  static async queryAllClass(config = {}) {
    const result = await Class.findAll({
      order: [['created_at', 'DESC']]
    })

    return result
  }
}

Class.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //班级名称
  name: {
    type: DataTypes.STRING
  },
  //老师
  teacher: {
    type: DataTypes.INTEGER
  },
  //课程
  course: {
    type: DataTypes.INTEGER
  },
  //人数
  person: {
    type: DataTypes.INTEGER
  },
  //学员人数上限
  maxPerson: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  //备注
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  tableName: 'class'
})

module.exports = { Class }