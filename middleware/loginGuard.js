//拦截请求，以/admin开头的访问，需要验证登录状态
const guard = (req, res, next) => {

    //判断是否时登录页面。这个不用登录状态也能访问

    //url在解析过程中回被逐级删减，/admin/login就剩下login了
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        //如果是要去的login页面||admin页面&&是登录状态&&管理员身份，则将请求放行
        if (req.session.role == 'normal') {
            return res.redirect('/home');
        }

        next();

    }

};
module.exports = guard;