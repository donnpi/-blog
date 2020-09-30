module.exports = (req, res) => {
    //删除session.删除成功调用回调函数
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('connect.sid');
        //重定向回登录页面
        res.redirect('/admin/login');
        //清除模板中的用户信息
        req.app.locals.userInfo = null;
    })
}