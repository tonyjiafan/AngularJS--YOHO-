var homeApp = angular.module("homeApp",[]);
homeApp.controller("homeController", function ($scope,$location,$http,$rootScope) {
    //$scope.Search = "";
    //session对象
    $http.get('/users/getUser').success(function (data) {
            $rootScope.phone = data;

            //console.log(data[0].u_name);
            if(data == ""){
                $scope.user = false;
            }else{
                $scope.user = true;
            }
        });
    //注销
    $scope.logOut = function () {
        $http.get('/users/logOut').success(function (data) {
            $rootScope.phone = null;
        });
        $scope.user = false;
    };


    //跳转List页面/login/reg
        $scope.goList = function(){
            console.log("goLIst");
            $location.path("/list");
        };
    /*-------------------*/
        $scope.goLogin = function(){
            $location.path("/login");
        };
    /*-----------------------*/
        $scope.goReg = function(){
            $location.path("/reg");
        };




    //----搜索-------==========================================---------
    //    $scope.SearchImg = function () {
    //        $location.search({
    //            userSearch:$scope.Search
    //        });
    //
    //        $location.path("/list");
    //    };


    //轮播
        /*==============轮播1============*/
        var changImg = function () {
            var container = document.getElementById('container');
            var listImg = document.getElementById('listImg');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var index = 1;
            var animated = false;
            var timer;

            //轮播小圆点
            function showButton(){
                for(var i = 0; i < buttons.length; i++){
                    if(buttons[i].className == 'show'){
                        buttons[i].className = 'spot_span';
                        break;
                    }
                }
                buttons[index - 1].className = 'show';
            }

            //自动播放
            function play(){
                timer = setInterval(function () {
                    next.onclick();
                },3000)
            }

            //停止动画
            function stop(){
                clearInterval(timer);
            }

            //轮播动画
            function animate(offset){
                animated = true;
                var newLeft = parseInt(listImg.style.left) + offset;
                var time = 800;  //λ����ʱ��
                var interval = 10; //λ�Ƽ��ʱ��
                var speed = offset/(time/interval); //ÿ��λ�Ƶ���

                function go(){
                    if(speed < 0 && parseInt(listImg.style.left) > newLeft || speed > 0 && parseInt(listImg.style.left) < newLeft){
                        listImg.style.left = parseInt(listImg.style.left) + speed + 'px';
                        setTimeout(go,interval);
                    }
                    else{
                        animated = false;
                        listImg.style.left = newLeft + 'px';
                        if(newLeft > -1080){
                            listImg.style.left = -8640 + 'px';
                        }
                        if(newLeft < -8640){
                            listImg.style.left = -1080 + 'px';
                        }
                    }
                }
                go();

            }

            //下一张
            next.onclick = function () {
                stop();
                if(index == 8){
                    index = 1;
                }else{
                    index += 1;
                }
                showButton();
                if(animated == false){
                    animate(-1080);
                }
                play();
            };

            //上一张
            prev.onclick = function () {
                stop();
                if(index == 1){
                    index = 8;
                }else{
                    index -= 1;
                }
                showButton();
                if(animated == false){
                    animate(1080);
                }
                play();
            };

            //轮播圆点点击事件
            for(var i = 0; i < buttons.length; i++){
                buttons[i].onclick = function () {
                    //被点击时先停止动画，执行完下面的代码在运行
                    stop();
                    //点击当前圆点时不做任何改变
                    if(this.className == 'show'){
                        return;
                    }
                    var myIndex = parseInt( this.getAttribute('index')); //��ȡ�Զ������Ժ�DOM����
                    var offset = -1080 * (myIndex - index);
                    index = myIndex;
                    showButton();
                    if(animated == false){
                        animate(offset);
                    }
                    //播放动画
                    play();
                }
            }

            //鼠标移入动画停止时间
            container.onmouseover = stop;
            container.onmouseout = play;
            play();

        };
        /*==============轮播2============*/
        var changImg2 = function () {
            var container = document.getElementById('big-div1');
            var listImg = document.getElementById('brand_list');
            var timer;


            //自动播放
            function play(){
                timer = setInterval(function () {
                    animate(-240);
                },3000)
            }

            //停止动画
            function stop(){
                clearInterval(timer);
            }

            //轮播动画
            function animate(offset){
                //console.log("in");
                var newTop = parseInt(listImg.style.top) + offset;
                //console.log(newTop);
                var time = 3000;  //位移总时间
                var interval = 0; //位移间隔时间
                var speed = offset/(time/interval); //每次位移的量

                function go(){
                    if(speed < 0 && parseInt(listImg.style.top) > newTop || speed > 0 && parseInt(listImg.style.top) < newTop){
                        listImg.style.top = parseInt(listImg.style.top) + speed + 'px';
                        setTimeout(go(),interval);
                    }
                    else{
                        //console.log("on");
                        listImg.style.top = newTop + 'px';
                        if(newTop > -240){
                            listImg.style.top = -1200 + 'px';
                        }
                        if(newTop < -1200){
                            listImg.style.top = -240 + 'px';
                        }
                    }
                }
                go();

            }

            //鼠标移入动画停止时间
            container.onmouseover = stop;
            container.onmouseout = play;
            play();
        };
        /*==============轮播3============*/
        var changImg3 = function () {
            var container = document.getElementById('big-div2');
            var listImg = document.getElementById('brand_list2');
            var timer;


            //自动播放
            function play(){
                timer = setInterval(function () {
                    animate(-240);
                },2500)
            }

            //停止动画
            function stop(){
                clearInterval(timer);
            }

            //轮播动画
            function animate(offset){
                //console.log("in");
                var newTop = parseInt(listImg.style.top) + offset;
                //console.log(newTop);
                var time = 1000;  //位移总时间
                var interval = 500; //位移间隔时间
                var speed = offset/(time/interval); //每次位移的量

                function go(){
                    if(speed < 0 && parseInt(listImg.style.top) > newTop || speed > 0 && parseInt(listImg.style.top) < newTop){
                        listImg.style.top = parseInt(listImg.style.top) + speed + 'px';
                        setTimeout(go(),interval);
                    }
                    else{
                        //console.log("on");
                        listImg.style.top = newTop + 'px';
                        if(newTop > -240){
                            listImg.style.top = -1200 + 'px';
                        }
                        if(newTop < -1200){
                            listImg.style.top = -240 + 'px';
                        }
                    }
                }
                go();
            }

            //鼠标移入动画停止时间
            container.onmouseover = stop;
            container.onmouseout = play;
            play();
        };

        //视频播放按钮
        $(function () {
            $("#play_Btn").data("flag", true).on('mouseenter', function () {
                $(this).css({transform: 'rotate(130deg)'})
            }).on("mouseleave", function () {
                $(this).css({transform: 'rotate(-130deg)'})
            }).on("click", function () {
                //console.log("in");
                if ($(this).data("flag")) {
                    $(this).next().css("display", "block");
                    $(this).data("flag", false);
                } else {
                    $(this).next().css("display","none");
                    $(this).data("flag", true);
                }
            })
        });

        /*=================方法执行=========================*/
        changImg();
        changImg2();
        changImg3();
});




