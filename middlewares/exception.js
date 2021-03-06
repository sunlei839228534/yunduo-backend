const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isDev = global.config.environment === 'dev'
    const isHttp = error instanceof HttpException
    if (isDev && !isHttp) {
      throw error
    }
    if (isHttp) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: '不可知的错误！',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = { catchError }