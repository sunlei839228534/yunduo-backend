const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden()
      }
      try {
        var decode = jwt.verify(userToken.name,
          global.config.security.secretKey)
      } catch (error) {
        //token不合法
        //token过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new global.errs.Forbidden(errMsg)
      }
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }

  static verifyToken(token) {
    try {
      const { user } = jwt.verify(token, global.config.security.secretKey)
      return {
        nickname: user.nickname,
        email: user.email
      }
    } catch (error) {
      throw new global.errs.AuthFailed()
    }
  }
}

module.exports = { Auth }