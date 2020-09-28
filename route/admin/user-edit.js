module.exports = (req, res) => {
    //message是，如果用户信息不合法，提交路由传过来的错误信息
    const { message } = req.query
    res.render('admin/user-edit', {
        message
    });

}