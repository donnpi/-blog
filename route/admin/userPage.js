const { User } = require('../../model/user');
module.exports = async(req, res) => {

    //接收客户端传递过来的当前页参数(没有传入则默认为1)
    let page = req.query.page || 1;
    //每页显示的数据条数
    let pagesize = 10;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //计算总页数,向上取整
    let total = Math.ceil((count / pagesize));

    //查询出当前页码的内容
    let user = await User.find({}).limit(pagesize).skip((page - 1) * pagesize);

    res.render('admin/user', {
        msg: req.session.username,
        user,
        //把当前页和总页数传过去
        page,
        total

    })

};