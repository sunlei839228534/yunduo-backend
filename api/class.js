const Router = require('koa-router')

const router = new Router()

router.get('/queryClasses', async (ctx, next) => {
  ctx.body = {
    data: [
      {
        name: "少儿英语",
        timeSpend: '2h'
      }
    ]
  }
  await next()
})

module.exports = router