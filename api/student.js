const Router = require('koa-router')
const { Auth } = require('../middlewares/auth')
const { Student } = require('../models/student')
const { CreateStudentValidator } = require('../validators/validator')

const router = new Router({
  prefix: '/student'
})

router.post('/create', new Auth(8).m, async (ctx, next) => {

})


module.exports = router