const Router = require('koa-router')
const { HttpException, ParameterException } = require('../core/http-exception')

const router = new Router()


router.get('/queryClasses/:id', async (ctx, next) => {
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