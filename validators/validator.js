const { LinValidator, Rule } = require('../core/lin-validator')

const { User } = require('../models/user')

class PostiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范！')
    ]
    this.password = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      })
    ]
  }
  async validateHasUser(vals) {
    const { email } = vals.body
    const user = await User.findOne({
      where: email
    })
    if (!user) {
      throw new Error('没有该用户！')
    }
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范！')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      })
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 2,
        max: 32
      })
    ]
  }
  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw Error('两个密码必须相同')
    }
  }
  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('email已存在')
    }
  }
}


module.exports = {
  PostiveIntegerValidator,
  RegisterValidator,
  LoginValidator
}