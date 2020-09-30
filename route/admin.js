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
admin.post('/user-modify', require('./admin/user-modify'))

//实现删除用户功能
admin.post('/delete', require('./admin/user-delete'));

//渲染文章列表页面路由
admin.get('/article', require('./admin/article'));

//渲染文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

//实现新建文章功能和修改文章的路由
admin.post('/article-add', require('./admin/article-add'));

//实现文章删除功能
admin.post('/article-delete', require('./admin/article-delete'));



module.exports = admin;