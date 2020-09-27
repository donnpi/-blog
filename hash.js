//引入bcrypt
const bcrypt = require('bcrypt');

async function run() {
    //生成随机字符串，
    //接收一个参数，默认值是10，参数数值越大，生成的随机字符串复杂程度越高
    //返回一个promise对象
    //这个promise返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    //对密码进行加密
    //第一个参数：要进行加密的明文
    //第二个参数：随机字符串
    //返回值：加密后的密码
    const result = await bcrypt.hash('luluhahah', salt);
    console.log(result);
}
run(10)