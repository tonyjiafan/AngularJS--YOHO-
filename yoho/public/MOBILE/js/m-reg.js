/**
 * Created by 贾叔叔 on 2016/3/15.
 */
$(function () {
    var i,k;
    //注册用户名验证
   $("input[name=userPhone]").on("blur", function () {
       console.log("111111");
       var phone = $("input[name=userPhone]").val();
       if(/^[1][3458]\d{9}$/.test(phone)){
           $.ajax({
               type: "POST",
               url: "/users/reg",
               data: {
                   phone:$("input[name=userPhone]").val()
                   //userPwd:$("input[name=userPwd]").val()
               },
               success: function(data){
                   console.log(data);
                   if(data == "true"){
                       $("#info1").html("用户名已存在！").css({
                           'color':"gold",
                           'font-size':"14px"
                       });
                       i=0;
                   }else{
                       $("#info1").html("用户名通过！").css({
                           'color':"greenyellow",
                           'font-size':"14px"
                       });
                       i = 1;
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

    // 密码验证
    $("input[name=userPwd]").on("blur", function () {
        var password = $("input[name=userPwd]").val();
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

    //注册提验证
    $("#submit").on("click", function () {
        if(i==1 && k==1){
            $.ajax({
                type: "POST",
                url: "/users/addReg",
                data: {
                    phone:$("input[name=userPhone]").val(),
                    password:$("input[name=userPwd]").val()
                },
                success: function(data){
                    if(data == 'true'){
                        window.location = "./m-login.html";
                    }
                }
            });
        }else{
            $("#info3").html("用户民或密码错误！").css({
                'color':"gold",
                'font-size':"14px"
            });
        }
    })
});