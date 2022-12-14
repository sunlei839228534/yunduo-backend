const { sequelize } = require('../core/db')

const { Sequelize, Model } = require('sequelize')

class Class extends Model {

}

Class.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  //班级名称
  name: {
    type: Sequelize.STRING
  },
}, {
  sequelize,
  tableName: 'class'
})

module.exports = { Class }