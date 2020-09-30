const { Article } = require('../../model/article')
module.exports = async(req, res, next) => {
    console.log(req.body.id);
    try {
        await Article.findOneAndDelete({ _id: req.body.id });
        res.redirect('/admin/article');
    } catch (e) {

        let obj = { path: '/admin/article', message: e, id: req.body.id }
        next(JSON.stringify(obj))
    }


}