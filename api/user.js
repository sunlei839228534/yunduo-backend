const Router = require('koa-router')

const router = new Router({
  prefix: '/user'
})

const { RegisterValidator, TokenValidator: LoginValidator } = require('../validators/validator')

const { User } = require('../models/user')
const { generateToken } = require('../core/util')
const { Auth } = require('../middlewares/auth')

router.post('/login', async (ctx, next) => {
  const v = await new LoginValidator().validate(ctx)

  const user = await User.verifyEmailPassword(v.get('body.email'), v.get('body.password'))
  const token = generateToken(user.id, Auth.USER, user)
  ctx.body = {
    token,
    user: {
      nickname: user.nickname,
      email: user.email,
    }
  }
})

router.post('/register', async (ctx, next) => {
  //验证参数，验证是否已有同样的email
  const v = await new RegisterValidator().validate(ctx)
  // 在数据库中创建
  const user = await User.create({
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  })
  const token = generateToken(user.id, Auth.USER, user)
  ctx.body = {
    token,
    user: {
      nickname: user.nickname,
      email: user.email
    }
  }
})

router.get('/query', async (ctx, next) => {
  const users = await User.findAll()
  ctx.body = users
})

module.exports = router