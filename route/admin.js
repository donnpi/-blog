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

//渲染创建用户页面
admin.get('/user-edit', require('./admin/user-edit'));

//实现添加用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'))

//实现修改用户信息功能
admin.post('/user-modify', require('./admin/user.modify'))
module.exports = admin;