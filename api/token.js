const Router = require('koa-router')
const { User } = require('../models/user')
const { TokenValidator } = require('../validators/validator')
const router = new Router()

router.post('/token', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)

  const user = await User.verifyEmailPassword(v.get('body.account'), v.get('body.secret'))
  ctx.body = user
})

module.exports = router