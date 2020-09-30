const { Article } = require('../../model/article');
const formidable = require('formidable');
module.exports = async(req, res) => {
    const { id } = req.query;
    const { title, publishDate, content, cover } = req.body;
    await Article.updateOne({ _id: id }, {
        title,
        publishDate,
        content,
        cover
    })

}