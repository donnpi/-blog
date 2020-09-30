const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    //接收客户端传递过来的请求参数,
    const { username, email, role, state, password } = req.body;
    //要修改的id
    const id = req.query.id;

    let user = await User.findOne({ _id: id });

    //密码比对
    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {

        //更新除了密码以外的数据
        //虽然通过验证了证明密码和原先一样，但这里的是没有加密过的，更新后数据库里的就没加密了
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state
        });
        //重定向回用户列表页
        res.redirect('/admin/user');

    } else {
        //转到错误处理中间件
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行信息修改', id: id }
        next(JSON.stringify(obj));
    }


}