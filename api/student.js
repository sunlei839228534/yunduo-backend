const Router = require('koa-router')

const router = new Router()

router.get('/queryStudent', async (ctx, next) => {
  ctx.body = {
    data: [
      {
        name: 'peko',
        age: 12
      }, {
        name: 'joshua',
        age: 24
      }
    ]
  }
  await next()
})

module.exports = router