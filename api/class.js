const Router = require('koa-router')
const { HttpException, ParameterException } = require('../core/http-exception')

const router = new Router()

router.get('/queryClasses', async (ctx, next) => {
  const error = new ParameterException()
  throw error
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