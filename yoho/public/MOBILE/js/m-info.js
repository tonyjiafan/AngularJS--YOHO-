/**
 * Created by 贾叔叔 on 2016/3/15.
 */
$(function () {
    //接收商品id
   var p_id = $.query.get("p_id");
    //console.log(p_id)
    //获取商品详情
    $.ajax({
        type: "POST",
        url: "/users/showInfoId",
        data:{
            //商品ID传到后台
            jieshouListId:p_id
        },
        success: function(data){
            //console.log(data);
            var imgDA = data[0].p_detail_imgDA.split("@");
            //console.log(imgDA);
            var imgXIAO = data[0].p_intro_imgJIESHAO.split("@");
            $("<div class='content1'></div>").appendTo($(".info1")).append(
                    $('<img src="../images/all2/' + imgDA[0] + '">')
                );
                $("<p class='price'>"+ data[0].p_price +"</p>").appendTo($(".pCoat"));
            //循环添加介绍部分的图片
            for(var i = 0; i < imgXIAO.length; i++) {
                $(".content3").append(
                    $("<img src='../images/all2/" + imgXIAO[i] + "' />")
                );
            }

        }
    });
    //添加商品到购物车
    add_car = function () {
        $.ajax({
            type: "get",
            url: "/users/getUser",
            success: function (data) {
                if(data == ""){

                }else{
                    $.ajax({
                        type: "post",
                        url: "/users/MobileAddCar",
                        data:{
                            shopID: p_id,
                            userID: data[0].u_id
                        },
                        success: function (data) {
                            console.log(data);
                        }
                    });
                }

            }
        });

    };



    //跳转购物车
    $(".addbtn").on("click", function () {
        location.href = "./m-car.html"
    })
});