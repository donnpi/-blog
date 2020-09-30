const { render } = require('art-template');
const { Article } = require('../../model/article');
module.exports = async(req, res) => {

    //接收客户端传来的id
    const { id } = req.query;
    let article = await Article.findOne({ _id: id }).populate('author').lean();
    console.log(article);
    res.render('home/article', {
        article

    })

}