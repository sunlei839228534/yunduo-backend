const Koa = require('koa')
const Router = require('koa-router')
const InitManager = require('./core/init')

const app = new Koa()
InitManager.initCore(app)

app.use(async (ctx, next) => {
  await next()
})


app.listen('8088', () => {
  console.log(`app is running in 8088`);
})