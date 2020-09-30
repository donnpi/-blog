const { render } = require('art-template');
const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {

    //接收客户端传来的id
    const { id } = req.query;
    let article = await Article.findOne({ _id: id }).populate('author').lean();
    const comment = await Comment.find({ aid: id }).populate('uid').lean();

    res.render('home/article', {
        article,
        comment

    })

}