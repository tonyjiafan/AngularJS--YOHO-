/**
 * Created by 贾叔叔 on 2016/3/15.
 */
$(function () {
    var i,k;
   //验证用户名
    $("input[name=Phone]").on("blur", function () {
        var phone = $("input[name=Phone]").val();
        if(/^[1][3458]\d{9}$/.test(phone)){
            $.ajax({
                type: "POST",
                url: "/users/PhoneS",
                data: {
                    phone:$("input[name=Phone]").val()
                    //userPwd:$("input[name=userPwd]").val()
                },
                success: function(data){
                    if(data == "true"){
                        $("#info1").html("用户名正确！").css({
                            'color':"greenyellow",
                            'font-size':"14px"
                        });
                        i = 1;
                    }else{
                        $("#info1").html("用户名错误请重新输入！").css({
                            'color':"gold",
                            'font-size':"14px"
                        });
                        i=0;
                    }
                }
            });
        }else{
            $("#info1").html("用户名格式错误请核对后重新输入！").css({
                'color':"gold",
                'font-size':"14px"
            });
            i = 0;
        }
    });
    //验证密码
    $("input[name=Pwd]").on("blur", function () {
        var password = $("input[name=Pwd]").val();
        if(/(?=^.{8,15}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[A-Z]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&]*$/.test(password)){
            $("#info2").html("密码格式正确！").css({
                'color':"greenyellow",
                'font-size':"14px"
            });
            k = 1;
        }else{
            $("#info2").html("密码格式错误！").css({
                'color':"gold",
                'font-size':"14px"
            });
            k = 0;
        }
    });

    //登陆跳转
    $("#login").on("click", function () {
        if(i==1 && k==1){
            $.ajax({
                type: "POST",
                url: "/users/login",
                data: {
                    phone:$("input[name=Phone]").val(),
                    password:$("input[name=Pwd]").val()
                },
                success: function(data){
                  console.log(data);
                    if(data.length > 0){
                        window.location = "../m-home.html"
                    }
                }
            });
        }else{
            $("#info2").html("密码错误请重新输入！").css({
                'color':"gold",
                'font-size':"14px"
            });
        }
    })
});