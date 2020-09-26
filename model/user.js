//创建用户模块
const mongoose = require('mongoose');
//创建用户集合规则
const userSehema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    //admin 超级管理员
    //normal 普通用户

    role: {
        type: String,
        require: true
    },
    status: {
        //0 启动状态
        //1 禁止状态
        type: Number,
        default: 0

    }
});
//创建集合
const User = mongoose.model('User', userSehema);

//测试代码
// User.create({
//         username: 'nico',
//         email: 'nico@136.com',
//         password: 123456,
//         role: 'admin',
//         state: 0
//     }).then(() => { console.log('用户创建成功') }).catch(err => { console.log(err, '用户创建失败') })
//     //将用户集合作为模块成员导出


module.exports = {
    //ES6中，如果对象的键和值名称一样，就可以省略值，如User: User，可以只写User
    User

}