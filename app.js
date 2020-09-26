const express = require('express');
//创建服务器
const app = express();
const path = require('path');

//数据库连接
require('./model/connect');

//处理post参数
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//框架模板:设置模板引擎,默认路径.默认后缀
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');


//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));



//引入路由模块
const admin = require('./route/admin');
const home = require('./route/home');
//连接路由
app.use('/home', home);
app.use('/admin', admin);



//监听端口
app.listen(80);
console.log('网站服务器启动成功');