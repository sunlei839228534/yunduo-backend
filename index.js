const Koa = require('koa')
const Router = require('koa-router')
const parser = require('koa-bodyparser')
const cors = require('koa-cors')

const InitManager = require('./core/init')
const { catchError } = require('./middlewares/exception')


const app = new Koa()
app.use(catchError)
app.use(cors())
app.use(parser())
InitManager.initCore(app)

app.listen('8088', () => {
  console.log(`app is running in 8088`);
})