const express =require('express')
const router =express.Router()

const admin =require('./admin')
const home =require('./home')

//拦截请求。以/admin开头的访问，需要验证登录状态,不是admin就跳转登录页
router.use('/admin', require('../middleware/loginGuard'));

//为路由匹配请求路径
router.use('/admin',admin)
router.use('/home',home)

module.exports=router
