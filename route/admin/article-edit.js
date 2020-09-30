const { Article } = require('../../model/article');
module.exports = async(req, res) => {

    //标识：当前访问的是文章管理页面
    req.app.locals.currentLink = 'artcle-edit';
    const { id } = req.query;
    if (id) {
        let article = await Article.findOne({ _id: id })
        res.render('admin/article-edit', {
            article,
            link: '/admin/article-add?id=' + id
        });
    } else {
        res.render('admin/article-edit', {
            link: '/admin/article-add'
        });
    }


}