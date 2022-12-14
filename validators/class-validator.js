const { LinValidator, Rule } = require("../core/lin-validator");

class CreateClassValidator extends LinValidator {
  constructor() {
    super()
    this.name = []
  }
}


module.exports = {
  CreateClassValidator
}