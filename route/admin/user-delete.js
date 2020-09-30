const { User } = require('../../model/user');
module.exports = async(req, res) => {
    try {

        await User.findOneAndDelete({ _id: req.body.id });
    } catch (e) {
        let obj = { path: '/admin/user', message: e }
        return next(JSON.stringify(obj));
    }
    res.redirect('/admin/user');



}