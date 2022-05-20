const Router = require("koa-router")
const requireDirectory = require("require-directory")

class InitManager {
  static initCore(app) {
    InitManager.initLoadRouters(app)
    InitManager.loadConfig()
    InitManager.errorConfig()
  }

  static initLoadRouters(app) {
    const apiDirectory = `${process.cwd()}/api`
    requireDirectory(module, apiDirectory, {
      visit: onLoadDirectory
    })

    function onLoadDirectory(obj) {
      if (obj instanceof Router) {
        app.use(obj.routes())
      }
    }
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
  static errorConfig() {
    const errors = require(process.cwd() + '/core/http-exception.js')
    global.errs = errors
  }
}
module.exports = InitManager