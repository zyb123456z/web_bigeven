$(function () {
    var form = layui.form;

    form.verify({
        nickname: function (value) {
            if(value.length > 6){
                return '昵称必须在1-6位数之间'
            }
          }
    });
    initUser_info();

    // 获取用户信息
    function initUser_info() {

        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function (res) {
                if(res.status != 0){
                    return layer.msg("信息获取失败");
                }
                console.log(res);
                // $("#username").val(res.data.username)
                // 快速赋值
                form.val('formUser_info',res.data);

              }
        })
      }


      $("#btnReset").on('click',function (e) {
        //   阻止表单默认的全部清空行为
        e.preventDefault();
        initUser_info();

        })

        // g更新用户信息
        $(".layui-form").on('submit',function (e) {
            e.preventDefault();

            $.ajax({
                method:'POST',
                url:'/my/userinfo',
                data:$(this).serialize(),
                success:function (res) {
                    if(res.status != 0){

                        return layer.msg("更新信息失败")
                    }
                    // console.log("更新信息成功");
                    // console.log(res);
                    window.parent.getUsers();
                  }
            })
          })
  })