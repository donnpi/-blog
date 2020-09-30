const express = require('express');
//处理路径
const path = require('path');
//导入express-sesion
const session = require('express-session');
//数据库连接
require('./model/connect');
//导入post参数处理模块
const bodyParser = require('body-parser');
//导入dateFormat第三方模块
const dateFormat = require('dateformat');
//导入art-template模板引擎
const template = require('art-template');
//导入morgan第三方模块
const morgan = require('morgan');
//导入config第三方模块
const config = require('config');
//创建服务器
const app = express();

//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//处理post参数
app.use(bodyParser.urlencoded({ extended: false }));



//向模板内导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//框架模板:设置模板引擎,默认路径.默认后缀
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');


//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//使用config.get获取json文件中的配置
console.log(config.get('title'));

//获得系统环境变量，process.env返回值是对象
if (process.env.NODE_env == 'development') {
    console.log('当前是开发环境');
    //将客户端的请求信息打印到控制台中
    app.use(morgan('dev'));
} else {
    //当前是生产环境
    console.log('当前是生产环境');
}
console.log(process.env.NODE_env);


//拦截请求，以/admin开头的访问，需要验证登录状态
app.use('/admin', require('./middleware/loginGuard'));


//引入路由
const admin = require('./route/admin');
const home = require('./route/home');


//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);


//错误处理中间件
app.use((err, req, res, next) => {
    //next里的参数实际就是err
    //接收过来的字符串要转换一下
    const result = JSON.parse(err);


    // res.redirect(`${result.path}?message=${result.message}`);
    //path后面的参数个数是不固定的
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    };
    res.redirect(`${result.path}?${params.join('&')}`)



})

//监听端口
app.listen(80);
console.log('网站服务器启动成功');