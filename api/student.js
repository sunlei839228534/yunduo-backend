const Router = require('koa-router')

const router = new Router()

router.get('/queryStudent', async (ctx, next) => {
  await next()
})

module.exports = router