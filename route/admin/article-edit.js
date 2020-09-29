module.exports = (req, res) => {

    //标识：当前访问的是文章管理页面
    req.app.locals.currentLink = 'artcle-edit';

    res.render('admin/article-edit');
}