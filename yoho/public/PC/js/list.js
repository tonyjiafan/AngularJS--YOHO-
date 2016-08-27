
var listApp = angular.module("listApp",[]);

listApp.controller("listController", function ($scope,$location,$http,$rootScope) {
    //session对象 和 注销功能
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



    //跳转info页面  这里的ID是页面上传过来的ID
    $scope.goInfo = function(id){
        console.log(id);
        $location.search({
            goInfoId:id   //给要传参的ID一个名字
        });
        $location.path("/info");
    };
    /*-------------------*/
    $scope.goLogin = function(){
        $location.path("/login");
    };

   // 获取对象
    $http.post('/users/getAll').success(function (data) {
        $scope.listData = data;
        console.log(data);  //obj
    });

    //搜索
    $scope.SearchImg = function () {
        var SearchInfo = {
            shopName:$scope.Searchlist
        };
        $http.post("/users/search",SearchInfo).success(function (data) {
            console.log(data);
            $scope.listData = data;
        })
    };




    //二级菜单
    $(function () {
        //二级列表
        $(".info").data("flag",true).on("click",function(){
            if($(this).data("flag")){
                $(this).next().css("display","block");  //当前元素的兄弟元素
                //$(this).children().eq(0).addClass("jiantou-show");  //当前元素的第0个儿子,动态添加class存在CSS优先级问题
                $(this).children().eq(0).css({
                    transform: "rotate(90deg)"
                });
                $(this).data("flag",false);
            } else{
                $(this).next().css("display","none");
                //$(this).children().eq(0).addClass("jiantou-hidde");
                $(this).children().eq(0).css({
                    transform: "rotate(0deg)"
                });
                $(this).data("flag",true);
            }
        })
    });
});










