const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Student } = require('../models/student')
const { CreateStudentValidator } = require('../validators/validator')

const router = new Router({
  prefix: '/student'
})

router.post('/create', new Auth(8).m, async (ctx, next) => {
  const v = await new CreateStudentValidator().validate(ctx)
  const student = await Student.create({
    name: v.get('body.name'),
    nickname: v.get('body.Nickname')
  })
  throw new global.errs.Success()
})

router.get('/queryStudent', async (ctx, next) => {
  await next()
})

module.exports = router