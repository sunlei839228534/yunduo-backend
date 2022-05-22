const Router = require('koa-router')
const { HttpException, ParameterException } = require('../core/http-exception')
const { Auth } = require('../middlewares/auth')

const router = new Router({
  prefix: '/class'
})


router.get('/queryClasses/:id', new Auth(8).m, async (ctx, next) => {
  ctx.body = ctx.auth.uid
  await next()
})


module.exports = router