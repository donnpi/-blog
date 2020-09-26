const express = require('express');
const admin = express.Router();
admin.get('/login', (req, res) => {
    res.render('admin/login');
});
//实现登录功能
admin.post('/login', (req, res) => {
    //接收请求参数
    const { email, password } = req.body;
    //如果用户没有输入邮件地址，
    if (email.trim().length == 0 || password.trim().length == 0) {
        //send把html状态码自动设定为200，要手动调整
        //用return阻止代码向下运行
        // return res.status(400).send('<h4>邮件地址或者密码错误</h4>');

        //要响应得更好看呢
        return res.status(400).render('admin/error', { msg: '邮件或密码错误' });

    }

})
admin.get('/user', (req, res) => {
    res.render('admin/user')
})
module.exports = admin;