$(function () {

    getUsers();


    // 退出功能
  $(".destory").on('click',function () {
    layer.confirm('确认退出登录吗？', {icon: 3, title:'提示'}, 
    function(index){
        //do something
        // 退出是清空本请求头
        localStorage.removeItem('token');
        // 跳转到登录界面
        location.href = "/home/login.html";

        // 关闭询问框
        layer.close(index);
      });
    })

  })

  function getUsers() { 
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // },
        success:function (res) { 
            // console.log(localStorage.getItem('token'));
            console.log(res);

            if(res.status !== 0){
                return layer.msg('获取信息失败');
            }
            readActivt(res.data);
         },
        //  不管成功或是失败都会调用complete，现在统一放到baseApi里面
        //  complete:function (res) {
        //      console.log(res);
        //      if(res.responseJSON.status ===1 && 
        //         res.responseJSON.message ==='身份认证失败！'){
        //             console.log(1);
        //             // 强制清空token
        //             localStorage.removeItem('token');
        //             // 强制返回登录界面
        //             location.href ="/home/login.html"
        //         }
        //    }
    })
 }
 

//  渲染用户头像
function readActivt(data) {

    // 获取用户头像
    var name = data.nickname || data.username;
    // 用户名称
    $("#welcome").html(name);

    if(data.user_pic !== null){
        $(".layui-nav-img").attr('src',data.user_pic).show();
        $(".text_active").hide();
    }else{
        $(".layui-nav-img").hide();
        // 获取第一个字
        var first = name[0].toUpperCase();
        $(".text_active").html(first).show();
    }
  }