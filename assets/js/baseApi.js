// 每次发送请求的时候会先调用这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+ options.url;
    // console.log(options.url);
    
    if(options.url.indexOf('/my/') !== -1){
    // 统一设置请求头
    options.headers = {
        Authorization:localStorage.getItem('token')
    }

    // 统一设置全局complete
    options.complete = function (res) { 
        if(res.responseJSON.status ===1 && 
                    res.responseJSON.message ==='身份认证失败！'){
                        console.log(1);
                        // 强制清空token
                        localStorage.removeItem('token');
                        // 强制返回登录界面
                        location.href ="/home/login.html"
                    }
     }
}
})