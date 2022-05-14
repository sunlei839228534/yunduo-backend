const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = {
    name: 'pe11ko',
    age: 12
  }
  await next()
})

app.listen('8088', () => {
  console.log(`app is running in 8088`);
})