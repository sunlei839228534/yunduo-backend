const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Course } = require('../models/course')
const { CreateCourseValidator, DestroyCourseValidator, UpDateCourseValidator, CHARGE_MODE_TYPE } = require('../validators/course-validator')

const router = new Router({
  prefix: '/course'
})

router.post('/create', new Auth(8).m, async (ctx, next) => {
  const v = await new CreateCourseValidator().validate(ctx)

  const course = await Course.create({
    name: v.get('body.name'),
    teachingMode: v.get('body.teachingMode'),
    chargeMode: v.get('body.chargeMode'),
    chargeStandard: v.get('body.chargeStandard')
  })

  throw new global.errs.Success()
})

router.post('/query', new Auth(8).m, async (ctx, next) => {
  const courses = await Course.queryCourse()
  ctx.body = courses
})

router.delete('/:id', new Auth(8).m, async (ctx, next) => {
  const v = await new DestroyCourseValidator().validate(ctx)
  await Course.destroy({
    where: {
      id: v.get('path.id')
    }
  })
  throw new global.errs.Success()
})


router.put('/:id', new Auth(8).m, async (ctx, next) => {
  const v = await new UpDateCourseValidator().validate(ctx)

  await Course.update(v.get('body'), {
    where: {
      id: v.get('path.id')
    }
  })
  if (v.get('body').chargeMode === CHARGE_MODE_TYPE.By_TIME) {
    await Course.update({ chargeStandard: null }, {
      where: {
        id: v.get('path.id')
      }
    })
  }
  throw new global.errs.Success()
})

module.exports = router