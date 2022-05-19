const Router = require('koa-router')
const router = new Router()

const { RegisterValidator } = require('../validators/validator')

const { User } = require('../models/user')

router.post('user/login', async (ctx, next) => {

})

router.post('/user/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)
})


module.exports = router