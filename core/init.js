const Router = require("koa-router")
const requireDirectory = require("require-directory")

class InitManager {
  static initCore(app) {
    InitManager.initLoadRouters(app)
  }

  static initLoadRouters(app) {
    requireDirectory(module, '../api', {
      visit: onLoadDirectory
    })

    function onLoadDirectory(obj) {
      if (obj instanceof Router) {
        app.use(obj.routes())
      }
    }
  }
}
module.exports = InitManager