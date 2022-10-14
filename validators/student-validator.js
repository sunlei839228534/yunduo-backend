const { LinValidator } = require("../core/lin-validator");

class CreateStudentValidator extends LinValidator {
  constructor() {
    super()
    this.name = []
  }
}

module.exports = {
  CreateStudentValidator,
}