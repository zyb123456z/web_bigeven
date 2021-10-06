$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ], 

          samePwd: function (value) { 
              if(value === $("[name=oldPwd]").val()){
                  return "新旧密码不能一致"
              }
           },
           rePWd:function (value) {
               if(value !== $("[name=newPwd]").val()){
                   return "两次输入密码不一致"
               }
             }
    });


    // 提交表单
    $(".layui-form").on('submit',function (e) {
        e.preventDefault();
        // alert(2)
        // console.log($(this).serialize());
        $.ajax({

            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            // 解决跨域问题
            async:false,
            success: function(res) {
                alert(1)
                if(res.status !== 0){
                    return layer.msg('更新密码失败')
                }
                // console.log(res);
                console.log("更新密码成功");
                // layer.msg("更新密码成功")
                // 重置表单
                $(".layui-form")[0].reset();
              }
        })

        // $.ajax({
        //     method:'POST',
        //     url:'/my/updatepwd',
        //     data:$(this).serialize(),
        //     success:function (res) {
        //         console.log(res);
        //       }
        // })
        // $.post("/my/updatepwd",$(this).serialize(),function (res) {
        //     console.log(1);
        //   })
      })
  })