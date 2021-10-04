// 每次发送请求的时候会先调用这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+ options.url;
    console.log(options.url);
    
})