const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')

const router = new Router({
  prefix: '/class'
})


router.get('/queryClasses/:id', new Auth(8).m, async (ctx, next) => {
  ctx.body = ctx.auth.uid
  await next()
})

module.exports = router