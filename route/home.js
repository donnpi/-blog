const express = require('express');
const home = express.Router();

//渲染前台首页
home.get('/', require('./home/index'));

//渲染前台文章展示页面
home.get('/article', require('./home/article'));
//创建评论功能路由
home.post('/comment', require('./home/comment'))

module.exports = home;