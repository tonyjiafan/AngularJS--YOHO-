/**
 * Created by 贾叔叔 on 2016/3/10.
 */

var carApp = angular.module("carApp",[]);

carApp.controller("carController", function ($scope,$location,$http,$rootScope) {
    //session对象
    $http.get('/users/getUser').success(function (data) {
        $rootScope.phone = data;
        $rootScope._uID= data[0].u_id;
        console.log($rootScope._uID);
        if(data === ""){
            $scope.user = false;
        }else{
            $scope.user = true;
        }
        $scope.showCarAll($rootScope._uID);   //执行获取购物车列表，传用户的id过去
    });

    //注销
    $scope.logOut = function () {
        $http.get('/users/logOut').success(function (data) {
            $rootScope.phone = null;
        });
        $scope.user = false;
    };


    //获取购物车列表  拿到上面的用户id
    $scope.showCarAll = function (id) {
        var uID = {
            userID:id       //用户id
        };
        $http.post("/users/getCar",uID).success(function (data) {
            $scope.carData = data;
            console.log(data + 'carData');       //

            //==========算商品总价========
            $scope.totalPrice = 0;
            for(var i = 0;i < data.length; i++){
                $scope.totalPrice+=data[i].p_price * data[i].sc_count
            }
        });
    };


    //跳转登录页面
    $scope.goLogin = function(){
        $location.path("/login");
    };



    /*
    * 选择商品的数量
    * 将参数传递到后台页面展示的数据是从后台读取的
    */
    $scope.add_minus = function (uid,pid,cnt,num) {
        if(num<0){
            if(cnt>0){
                cnt= cnt+num-0
            }else{

            }
        }else{
            cnt=cnt+num-0
        }
        $http.post('/users/carChange',{
            uid:uid,
            pid:pid,
            count:cnt
        }).success(function (data) {
            var uID = {
                userId:$rootScope._uID
                //userId:1
            };
            $http.post("/users/getCar",uID).success(function (data) {
                $scope.carData = data;
                console.log($scope.carData);
                $scope.showCarAll($rootScope._uID);  //数量改变后要调用获取购物车列表的函数
            });
        })

    };

    //删除商品
    $scope.delBtn = function (uid,pid) {
        $http.post('/users/delCar',{
            uid:uid,
            pid:pid
        }).success(function (data) {
            $scope.showCarAll($rootScope._uID);   //删除后重新获取列表
        })
    };

    //goList页面
    $scope.goList = function () {
        $location.path("/list")
    }

});
