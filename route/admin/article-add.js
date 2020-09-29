//需要解析二进制文件
//引入formidable
const formidable = require('formidable');
const { Article } = require('../../model/article');


//上传需要绝对路径
const path = require('path');

module.exports = (req, res) => {
    //1,创建表单解析对象
    const form = new formidable.IncomingForm();
    //2,配置上传文件的存放目录
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    //3,保留上传文件的后缀
    form.keepExtensions = true;
    //4,解析表单
    //第一个参数：请求对象 
    //回调函数： fields:保存着普通表单数据（二进制以外的） 
    form.parse(req, async(err, fields, files) => {
        //1，err:如果表单解析失败，存储错误信息，如果表单解析成功。null
        //2，fileds:对象类型，保存普通表单数据类型（二进制以外的，如title=xx）
        //3，files 对象类型，保存了和上传文件相关的参数(包括path)
        console.log(files.cover.path);
        //G:\Node\blog\public\upload\upload_f5c1eff09d18c168fb785577f80bda33
        console.log(files.cover.path.split('public')[1]);
        //\upload\upload_f5c1eff09d18c168fb785577f80bda33
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content

        })
    });
    res.redirect('/admin/article');

}