const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Student } = require('../models/student')
const { CreateStudentValidator, UpDateStudentValidator, DestroyStudentValidator } = require('../validators/student-validator.js')

const router = new Router({
  prefix: '/student'
})

router.post('/create', new Auth(8).m, async (ctx, next) => {
  const v = await new CreateStudentValidator().validate(ctx)

  const student = await Student.create({
    name: v.get('body.name'),
    status: v.get('body.status'),
    code: v.get('body.code'),
    mobile: v.get('body.mobile'),
    wechat: v.get('body.mobile'),
    sex: v.get('body.sex')
  })

  throw new global.errs.Success()
})

router.post('/query', new Auth(8).m, async (ctx, next) => {
  const students = await Student.queryStudent()
  ctx.body = students
})

router.delete('/:id', new Auth(8).m, async (ctx, next) => {
  const v = await new DestroyStudentValidator().validate(ctx)
  await Student.destroy({
    where: {
      id: v.get('path.id')
    }
  })
  throw new global.errs.Success()
})

router.put('/:id', new Auth(8).m, async (ctx, next) => {
  const v = await new UpDateStudentValidator().validate(ctx)

  await Student.update(v.get('body'), {
    where: {
      id: v.get('path.id')
    }
  })

  throw new global.errs.Success()
})

module.exports = router