const Router = require('koa-router')
const { HttpException, ParameterException } = require('../core/http-exception')

const router = new Router()

const { PostiveIntegerValidator } = require('../validators/validator')

router.get('/queryClasses/:id', async (ctx, next) => {
  const v = await new PostiveIntegerValidator().validate(ctx)
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