const { validate, emailCheck, bcryptPass } = require('../../model/user');

module.exports = async(req, res, next) => {


    try {
        await validate(req.body)

    } catch (e) {
        //错位信息要显示在页面上
        //重定向只是向服务器发送请求，然后再经过渲染页面路由，还是更改页面信息要去那里更改
        //通过post请求参数把错误信息传过去
        // res.redirect(`/admin/user-edit?message=${e.message}`);

        //到错误处理中间件统一处理
        //next只接收一个对象，并且是字符串
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
    };


    if (await emailCheck(req.body.email)) {
        //写return的理由：redirect除了重定向还有一个end的事件，如果没写return，redirect后面还有send，命令行会报错
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已被占用' }))
    }

    //密码加密
    req.body.password = bcryptPass(req.body.password);
    //把明文密码替换掉

    await User.create(req.body);
    res.redirect('/admin/user');

}