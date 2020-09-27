const express = require('express');
//创建服务器
const app = express();
//处理路径
const path = require('path');
//导入express-sesion
const session = require('express-session');
//数据库连接
require('./model/connect');
//导入post参数处理模块
const bodyParser = require('body-parser');




//处理post参数
app.use(bodyParser.urlencoded({ extended: false }));

//配置session
app.use(session({ secret: 'secret key' }));

//框架模板:设置模板引擎,默认路径.默认后缀
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');


//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//拦截请求，以/admin开头的访问，需要验证登录状态
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配请求路径
const admin = require('./route/admin');
const home = require('./route/home');

//连接路由
app.use('/home', home);
app.use('/admin', admin);



//监听端口
app.listen(80);
console.log('网站服务器启动成功');