const { mongo } = require('mongoose');
const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {

    let page = req.query.page || 1;
    let article = await pagination(Article).page(page).size(4).display(2).find().populate('author').exec();
    article = JSON.stringify(article);
    article = JSON.parse(article);


    // res.send(article)
    // return
    res.render('home/default', {
        article,
        page
    })

}