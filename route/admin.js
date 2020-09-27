const express = require('express');
const admin = express.Router();

//渲染登录页面
admin.get('/login', require('./admin/loginPage'));
//实现登录功能
admin.post('/login', require('./admin/login'));
//渲染用户列表页面
admin.get('/user', require('./admin/userPage'));

//实现退出功能
admin.get('/logout', require('./admin/logout'));



module.exports = admin;