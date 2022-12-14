const { LinValidator, Rule } = require("../core/lin-validator");

class CreateStudentValidator extends LinValidator {
  constructor() {
    super()
    this.name = [
      new Rule('isLength', '不能超过16个字符', { max: 16 })
    ]
  }
}

class DestroyStudentValidator extends LinValidator {
  constructor() {
    super()
    this.id = []
  }
}

class UpDateStudentValidator extends LinValidator {
  constructor() {
    super()
  }
}


module.exports = {
  CreateStudentValidator,
  DestroyStudentValidator,
  UpDateStudentValidator
}