const Router = require('koa-router')
const { generateToken } = require('../core/util')
const { Auth } = require('../middlewares/auth')
const { User } = require('../models/user')
const { TokenValidator, NotEmptyValidator } = require('../validators/validator')
const router = new Router()

router.post('/token', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)

  const user = await User.verifyEmailPassword(v.get('body.account'), v.get('body.password'))
  const token = generateToken(user.id, Auth.USER)
  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)

  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    result
  }
})

module.exports = router