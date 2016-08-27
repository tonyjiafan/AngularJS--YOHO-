$(function () {
    //跳转商品列表
    $('#goList').on("click", function () {
        location.href = "./html/m-list.html"
    });


    //跳转搜索页面
    $("#serchBtn").on("click", function () {
       location.href = "./html/m-list.html"
    });



    var changeImg = function () {
        var container = document.getElementById('container');
        var listImg = document.getElementById('listImg');
        var timer;

        //自动播放
        function play(){
            timer = setInterval(function () {
                animate(-7.5);
            },2000)
        }

        //轮播动画
        function animate(offset){
            //console.log("in");
            var newLeft = parseFloat(listImg.style.left) + offset;
            //console.log(newLeft);
            var time = 1000;  //位移总时间
            var interval = 10; //位移间隔时间
            var speed = offset/(time/interval); //每次位移的量

            function go(){
                if(speed < 0 && parseFloat(listImg.style.left) > newLeft || speed > 0 && parseFloat(listImg.style.left) < newLeft){
                    listImg.style.left = parseFloat(listImg.style.left) + speed + 'px';
                    setTimeout(go(),interval);
                }
                else{
                    //console.log("on");
                    listImg.style.left = newLeft + 'rem';
                    if(newLeft > -7.5){
                        listImg.style.left = -45 + 'rem';
                    }
                    if(newLeft < -45){
                        listImg.style.left = -7.5 + 'rem';
                    }
                }
            }
            go();

        }
        play();
    }
    /*执行函数*/
    changeImg();
});




