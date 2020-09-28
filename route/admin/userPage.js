const { User } = require('../../model/user');
module.exports = async(req, res) => {
    let user = await User.find({});

    res.render('admin/user', {
        msg: req.session.username,
        user

    })
};