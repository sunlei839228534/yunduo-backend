const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {

  await next()
})

app.listen('8088', () => {
  console.log(`app is running in 8088`);
})