const article = require('../../model/article');
const { Article } = require('../../model/article');
//导入分页模块,
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    //标识：当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // let article = await Article.find().populate('author');

    let page = req.query.page || 1;

    let article = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();

    article = JSON.stringify(article);
    article = JSON.parse(article);


    // res.send(article);
    res.render('admin/article', {
        article,
        page

    })

}