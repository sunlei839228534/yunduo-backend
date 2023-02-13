const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Class } = require('../models/class')
const { CreateClassValidator } = require('../validators/class-validator')

const router = new Router({
  prefix: '/class'
})


router.post('/create', new Auth(8).m, async (ctx, next) => {
  const v = await new CreateClassValidator().validate(ctx)

  const c = await Class.create(v.get('body'))

  throw new global.errs.Success()
})

router.post('/query', new Auth(8).m, async (ctx, next) => {
  const c = await Class.queryClass()

  ctx.body = c
})


module.exports = router