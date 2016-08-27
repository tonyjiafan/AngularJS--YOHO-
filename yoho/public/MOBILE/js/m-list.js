$(function () {
    //遍历商品
    showListAll = function(){
        $.ajax({
            type: "POST",
            url: "/users/getAll",
            success: function(data){
                //console.log(data);
                for( var i = 0; i < data.length; i++){
                    $("<div class='info-coat'></div>").appendTo($(".list-info")).append(
                        $("<img src='../images/m-list/IMG_1398_20.png'/>"),
                        $("<div class='info-img'></div>").append(
                            $("<img onclick='goInfo("+ data[i].p_id +")' class='img-big' src='../images/all2/" + data[i].p_index_imgLIST + "'/>"),
                            $("<p class='info-p'>" + data[i].p_name + "</p>"),
                            $("<span class='price'>" + data[i].p_price + "</span>")
                        )
                    );
                }
            }
        });
    };
    showListAll();

    //搜索
    $("#sousuo").on("blur", function () {
        if($(this).val() != ""){
            $(".list-info").empty();   //判断搜索框的值不为空的时候就先清空他的子元素，在根据条件来展示符合搜索条件的商品
            $.ajax({
                type: "POST",
                url: "/users/search",
                data:{
                    shopName:$("#sousuo").val()
                },
                success: function(data){
                    console.log(data);
                    for( var i = 0; i < data.length; i++){
                        $("<div class='info-coat'></div>").appendTo($(".list-info")).append(
                            $("<img src='../images/m-list/IMG_1398_20.png'/>"),
                            $("<div class='info-img'></div>").append(
                                $("<img onclick='goInfo("+ data[i].p_id +")' class='img-big' src='../images/all2/" + data[i].p_index_imgLIST + "'/>"),
                                $("<p class='info-p'>" + data[i].p_name + "</p>"),
                                $("<span class='price'>" + data[i].p_price + "</span>")
                            )
                        );
                    }
                }
            });
        }
    });


    //跳转info页面，将商品ID传过去
    goInfo = function (p_id) {
        window.location = "./m-info.html?p_id=" + p_id;
    };

});