//创建用户模块
const mongoose = require('mongoose');

const Joi = require('joi');

//导入bcrypt
const bcrypt = require('bcrypt');
const { urlencoded } = require('body-parser');


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
    password: {
        type: String
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


//验证用户信息
const validate = user => {

    //定义对象的验证规则
    const Shema = {
        //error validate不通过时会返回的错误对象
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        //eamil方法可验证邮箱的格式
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值只能是normal或admin')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    //实施验证,不使用await，return出去在外面处理验证的结果
    return Joi.validate(user, Shema);
};

const emailCheck = email => {
    //查询邮箱地址有无被占用
    return User.findOne({ email: email });

};

//密码加密
const bcryptPass = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    return pass
}



//测试代码
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'nico',
        email: 'nico@136.com',
        password: pass,
        role: 'admin',
        state: 0
    });

}



module.exports = {
    //ES6中，如果对象的键和值名称一样，就可以省略值，如User: User，可以只写User
    User,
    validate,
    emailCheck,
    bcryptPass


}