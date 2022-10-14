const { LinValidator, Rule } = require('../core/lin-validator')
const { getEnumVal } = require('../core/util')
const { Course } = require('../models/course')
const { Op } = require('sequelize')

const TEACHING_MODE_TYPE = {
  ONE_TO_ONE: 1,
  ONE_TO_MANY: 2
}
const CHARGE_MODE_TYPE = {
  By_CLASS_HOUR: 1,
  By_TIME: 2
}

class BaseCourseValidator extends LinValidator {
  constructor() {
    super()
    this.name = [
      new Rule('isLength', '不能超过16个字符', { max: 16 })
    ]
    this.teachingMode = []
    this.chargeMode = [
      new Rule('isInt', '需要是整数')
    ]
    this.chargeStandard = [
      new Rule('isOptional'),
      new Rule('isInt', '需要是个不小于零的整数', { min: 1 })
    ]
  }  //验证传的值是否是枚举项
  validateModeType(vals) {
    const { chargeMode, teachingMode } = vals.body
    getEnumVal(TEACHING_MODE_TYPE, teachingMode)
    getEnumVal(CHARGE_MODE_TYPE, chargeMode)
  }
  validateChargeStandard(vals) {
    const { chargeStandard, chargeMode } = vals.body
    if (chargeMode === CHARGE_MODE_TYPE.By_CLASS_HOUR && !chargeStandard) {
      throw new Error('按课时收费，chargeStandard必须有值')
    }
    if (chargeStandard && typeof chargeStandard !== 'number') {
      throw new Error('chargeStandard必须是一个整数')
    }
  }
}

class CreateCourseValidator extends BaseCourseValidator {
  constructor() {
    super()
  }

  async validateCourseName(vals) {
    const { name } = vals.body
    const course = await Course.findOne({
      where: { name }
    })
    if (course) {
      throw new Error('课程名已存在！')
    }
  }
}


class UpDateCourseValidator extends BaseCourseValidator {
  constructor() {
    super()
  }
  async validateCourseNameRepeat(vals) {
    const { name } = vals.body
    const { id } = vals.path
    const course = await Course.findOne({
      where: {
        id: {
          [Op.ne]: id
        },
        name
      }
    })
    if (course) {
      throw new Error('课程名已存在！')
    }
  }
}

class DestroyCourseValidator extends LinValidator {
  constructor() {
    super()
    this.id = []
  }
}

module.exports = {
  CHARGE_MODE_TYPE,
  CreateCourseValidator,
  DestroyCourseValidator,
  UpDateCourseValidator
}