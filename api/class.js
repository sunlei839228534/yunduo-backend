const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Class } = require('../models/class')
const { CreateClassValidator } = require('../validators/class-validator')

const router = new Router({
  prefix: '/class'
})


router.post('/create', new Auth(8).m, async (ctx, next) => {
  const v = await new CreateClassValidator().validate(ctx)

  const c = await Class.create({
    name: v.get('body.name')
  })
  throw new global.errs.Success()
})

module.exports = router