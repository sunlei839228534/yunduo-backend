const { LinValidator, Rule } = require("../core/lin-validator");
const { Class } = require("../models/class");
const { User } = require('../models/user')

class CreateClassValidator extends LinValidator {
  constructor() {
    super()
  }

  async validateClassName(vals) {
    const { name } = vals.body
    const c = await Class.findOne({
      where: { name }
    })
    if (c) {
      throw new Error('班级名已存在')
    }
  }

  async validateTeacher(vals) {
    const { teacher: id } = vals.body
    const user = await User.findOne({
      where: { id }
    })
    if (!user) {
      throw new Error('老师不存在！')
    }
  }
}



module.exports = {
  CreateClassValidator
}