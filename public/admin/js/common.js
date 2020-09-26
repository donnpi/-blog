function serializeToJson(form) {
    var result = {};
    //serializeArray得到结果，[{name:'eamil',value:'用户输入的内容'},{name:'password',value:'用户输入的内容'}]
    //希望得到的结果：{email:'xx',password:xx}
    var f = form.serializeArray();
    f.forEach(function(item) {
        //下列等于添加result.email属性
        result[item.name] = item.value;
    });
    return result;
}

//为表单添加提交事件
//获取表单中用户输入的内容
$('#loginForm').on('submit', function() {
    var result = serializeToJson($(this));
    console.log(result);

    //验证有没有输入邮箱
    if (result.email.trim().length == 0) {
        //阻止程序向下执行，还可阻止表单提交
        //如果只写了return，代码就会停止，表单还是会提交,需要return false
        return false;
    }
    //如果没有输入密码
    if (result.password.trim().length == 0) {
        alert('请输入密码');
        return false;
    }

    //如果上面的都通过了，说明表单可以提交了
    //阻止表单默认提交的行为
    // return false;
})