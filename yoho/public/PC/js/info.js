
var infoApp = angular.module("infoApp",[]);

infoApp.controller("infoController", function ($scope,$location,$http,$rootScope) {
    //session对象
    $http.get('/users/getUser').success(function (data) {
        $rootScope.phone = data;
        console.log('username' + data[0].u_name);  //phone

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

    /*-------------------*/
    $scope.goLogin = function(){
        $location.path("/login");
    };
    //跳转car页面
    $scope.goCar = function(){
        $scope.post('/users/getAll').success(function (data) {
            $scope.data = data;
            console.log(data + 'info');
            for(var i = 0 ;i < data.length; i++){
                data[i].newImages = data[i].p_detail_imgDA.split("@");
                console.log(data[i]);
            }
        });
        $location.path("/car");
    };



    //获取对象并且遍历拆分


    console.log($location.search().goInfoId);
    //接收list页面商品传过来的ID
    $scope.jieshouListId = $location.search().goInfoId;
    $scope.listAllImg = function () {
        //把list页面传过来的参数【传给后台】
        var param= {
            jieshouListId:$scope.jieshouListId
        };
        $http.post('/users/showInfoId',param).success(function (data) {
            $scope.infoData = data;
            $scope.arr=[];
            for(var i = 0 ;i < data.length; i++){
                data[i].p_detail_imgDA =  data[i].p_detail_imgDA.split("@");
                data[i].p_detail_imgXIAO= data[i].p_detail_imgXIAO.split("@");
                data[i].p_intro_imgJIESHAO = data[i].p_intro_imgJIESHAO.split("@");
                //用数组接住详情大图的对象
                $scope.arr.push(data[i].p_detail_imgDA);
                //console.log($scope.arr[0][0]);
                $scope.show=$scope.arr[0][0];
            }
        });
    };
    $scope.listAllImg();


    /*==========详情图点击事件换图===================*/
    $scope.showLeftImg = function (index) {
        $scope.show = $scope.arr[0][index];
    };

    /*选择商品的数量*/
    $scope.count = 1;
    $scope.minus = function () {
        if($scope.count > 1){
            $scope.count--;
        }
    };

    //页面上的数据模型
    $scope.add = function () {
        $scope.count++;
        if($scope.count > 10){
            alert("单个用户单个商品限购10件");
            $scope.count = 10;
        }
    };
    //商品尺码选择
    $scope.sizeX = function (size) {
        //页面上的数据模型
        $scope.size = size;
        console.log(size);
    };

    /*===========往购物车添加数据===============*/
    $scope.add_car = function () {
        //console.log($rootScope.u_id);
        if( $rootScope.phone == ""){
            alert("请登陆后操作！");
            $location.path("/login");
        }else{
            $scope.addColor = "true";
            var shopINFO ={
                userID:$rootScope.u_id,
                shopID:$scope.jieshouListId,
                cnt:$scope.count,
                size: $scope.size
            };
            $http.post('/users/addCar',shopINFO).success(function (data) {
                console.log(data + 'infodata');
                $scope.addColor = "false";
            })
        }
    };

    //去购物车结算
    $scope.goCar = function () {
        $location.path("/car")
    };




});



//详情图展示
//$(function () {
//    $("#small_one").css( "cursor","pointer").on("mousedown", function () {
//        $(".info-show-left").css("background","url('../images/info/da.jpg')")
//    });
//
//    $("#small_two").css( "cursor","pointer").on("mousedown", function () {
//        $(".info-show-left").css({
//            "background":"url('../images//info/02164290d3c7317023896f3a06b8c8658a.jpg')",
//            "background-size":"cover"
//        })
//    });
//    $(".buying").on("click", function () {
//        location.href = "./car.html"
//    })
//});





