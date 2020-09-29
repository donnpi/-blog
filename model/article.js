//1,引入mongoose
const mongoose = require('mongoose');

//2,创建规则
//数据在插入到数据库之前，数据库对数据的判断
const articleShema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 30,
        minlength: 1,
        required: [true, '请填写文章标题']
            //如果required的属性没有填，的报错信息
    },
    //文章作者实际就是用户集合里的用户
    //author存储的是用户id
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
const Article = mongoose.model('Article', articleShema);

module.exports = {
    Article
}