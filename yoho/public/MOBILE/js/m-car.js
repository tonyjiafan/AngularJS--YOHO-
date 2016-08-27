/**
 * Created by 贾叔叔 on 2016/3/15.
 */
$(function () {
    //获取session用户的id
    $.ajax({
        type: "get",
        url: "/users/getUser",
        success: function (data) {
            console.log(data);
            if(data == ""){

            }else{
                //获取购物车列表
                console.log(data[0].u_id);
                $.ajax({
                    type: "post",
                    url: "/users/getCar",
                    data: {
                        userID:data[0].u_id
                    },
                    success: function(data){
                        console.log(data);
                        var str ="";
                        var str2 = "";
                        for(var i = 0; i < data.length; i++){
                            str += "<div class='content1'>" +
                                "<span class='checkbox-span'><input type='checkbox'></span>" +
                                "<span class='img-span'><img class='img-info' src='../images/all2/" + data[i].p_index_imgLIST + "' /></span>"+
                                "<span class='text-span'><p>颜色：<span>黑色</span></p><p>尺码：<span>-</span></p><span class='brand-info'> ￥ "+ data[i].p_price +"</span></span>"+
                                "</div>";
                            var p_price = data[i].p_price;
                            var totalPrice = data.length * p_price;
                        }
                        str2 +=
                            "<div class='gray'></div>" +
                            "<div class='sum'><p>总计:<span class='price'>￥"+ totalPrice  +"</span>=商品金额<span class='price'>￥"+ totalPrice +"</span> - <span>活动折扣</span></p></div>"
                        $(".content-warp").append(str,str2);
                        //console.log($(".content-warp").html());
                    }
                });
            }
        }
    });

});