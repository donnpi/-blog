//导入用户集合构造函数
const { User } = require('../../model/user');

//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    //接收请求参数
    const { email, password } = req.body;
    //如果用户没有输入邮件地址，
    if (email.trim().length == 0 || password.trim().length == 0) {
        //send把html状态码自动设定为200，要手动调整
        //用return阻止代码向下运行
        // return res.status(400).send('<h4>邮件地址或者密码错误</h4>');

        //要响应得更好看呢
        return res.status(400).render('admin/error', { msg: '邮件或密码错误' });
    };

    //根据邮箱地址查询用户信息
    //es6中，属性值和值的变量名一样的话，可以只写一个，这里原本是email:email（这个是post参数）
    //如果查询到对应用户，user为一个对象（布尔判断为true），如果没有，user为空
    let user = await User.findOne({ email });
    if (user) {
        //将客户端传递过来的密码和数据库中的信息做比对
        //解密,第一个参数:客户端传来的明文密码。第二个参数:数据库中加密过的密码
        //compare方法是异步api，返回布尔值
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            //将用户名存储在请求对象中
            req.session.username = user.username;
            req.session.role = user.role;

            //把用户信息开放到locals下
            //req.app就是app.js创建的网站服务器
            req.app.locals.userInfo = user;

            //对用户的角色进行判断
            if (user.role == 'admin') {
                //管理员到用户列表页
                res.redirect('/admin/user');
            } else {
                //普通用户去首页
                res.redirect('/home')
            }


        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
    }
}