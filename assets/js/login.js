$(function () {

    // 切换注册和登录
    $("#reg_li").on('click',function () {
        // this.style.display = "none";
        // this.parants.children[0].style.display = '';
        $(".login_box").hide();
        $(".reg_box").show();
    
      });

      $("#login_li").on('click',function () {
          $(".reg_box").hide();
          $(".login_box").show();
        })

    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码 必须6到12位，且不能有空格'],

        repwd:function (value) { 
            var pwd = $(".reg_box [name=password]").val();
            if(pwd != value){
                return '两次密码不一致'
            }
         }
    })

    // 注册
    $("#regist").on("submit",function (e) {
        // 阻止默认提价行为
        e.preventDefault();
        // 提交的数据
        var data ={
            username:$("#regist [name=username]").val(),
            password:$("#regist [name=password]").val()
        };
        console.log(data.username);
        // 发送请求
        $.post('/api/reguser', 
            data,
            function (res) {
            // alert(res.status)

                // 判断是否发送成功
                if(res.status!== 0){
                    // alert(2)
                    return layer.msg(res.message);;
                }
                layer.msg('注册成功，请登录！')
                $("#login_li").click();
            }
        );
       
      })


    //登录功能
       $("#form_login").on('submit',function (e) {

        // 阻止默认体检事件
        e.preventDefault();
        // alert(1)
        // 发送请求
        $.ajax({
           
            url:'/api/login',
            method:'POST',
            // 快速获取表单的数据
            data:$(this).serialize(),
            success:function (res) {
                // alert(2)
                if(res.status !==0){
                    return layer.msg("登录失败");

                }

                layer.msg("登录成功")
                // console.log("登录成功");
                // console.log(res.token);
                //登录成功后把token值放到localstorage中
                localStorage.setItem('token',res.token);
                location.href="/home/index.html"
              }

        })
         })

  })

