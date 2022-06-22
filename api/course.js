const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Course } = require('../models/course')
const { CreateCourseValidator } = require('../validators/course-validator')

const router = new Router({
  prefix: '/course'
})

router.post('/create', async (ctx, next) => {
  const v = await new CreateCourseValidator().validate(ctx)
  const course = await Course.create({
    name: v.get('body.name'),
    teachingMode: v.get('body.teachingMode'),
    chargeMode: v.get('body.chargeMode'),
    chargeStandard: v.get('body.chargeStandard')
  })
  throw new global.errs.Success()
})

router.post('/query', async (ctx, next) => {
  const courses = await Course.queryCourse()
  ctx.body = courses
})

module.exports = router