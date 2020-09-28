const { render } = require('art-template');
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //message是，如果用户信息不合法，提交路由传过来的错误信息
    const { message, id } = req.query;

    //如果传递了id，说明是修改操作，否则是添加操作
    if (id) {
        let user = await User.findOne({ _id: id });
        ////渲染带有用户信息的编辑页面
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'

        });
    } else {
        //渲染编辑页面
        res.render('admin/user-edit', {
            message,
            link: '/admin/use-edit',
            button: '添加'

        });
    }


}