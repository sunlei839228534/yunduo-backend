const Router = require('koa-router')

const router = new Router({
  prefix: '/user'
})

const { RegisterValidator, LoginValidator } = require('../validators/validator')

const { User } = require('../models/user')

router.post('/login', async (ctx, next) => {
  const v = await new LoginValidator().validate(ctx)
  const user = await User.verifyEmailPassword(v.get('body.account'), v.get('body.password'))

})

router.post('/register', async (ctx, next) => {
  //验证参数，验证是否已有同样的email
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  // 在数据库中创建
  const r = await User.create(user)

  throw new global.errs.Success()
})


module.exports = router