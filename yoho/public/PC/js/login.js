var loginApp = angular.module("loginApp",[]);
loginApp.controller("loginController", function ($rootScope,$scope,$location,$http) {

    //session对象
    $http.get('/users/getUser').success(function (data) {
        $rootScope.phone = data;
        console.log(data);   //null
    });

    var loginPhone;
    //登陆用户名验证
    $scope.isPhone = function () {
        function lgPhone (){
            if($scope.userPhone && /^[1][3458]\d{9}$/.test($scope.userPhone)){
                var userData = {
                    phone:$scope.userPhone
                };
                $http.post("/users/PhoneS",userData).success(function (data) {
                    console.log(data);  //true
                    if(data == "true"){
                        $scope.userInfo = "你输入的用户名正确！";
                        $scope.tips4 = "true";
                        loginPhone = 1
                    }else{
                        $scope.userInfo = "你输入的用户名错误！";
                        $scope.tips4 = "false";
                        loginPhone = 0
                    }
                })
            }else{
                $scope.userInfo = "用户名格式错误.请核对！";
                $scope.tips4 = "false";
                loginPhone = 0
            }
        }
        lgPhone();
    };
    /*-----------登录完整验证-----------*/
    $scope.submit = function () {
        if(loginPhone === 0 ){
            $scope.userInfo = "用户名格式错误.请核对！";
            $scope.tips4 = "false";
        }else{
            var userInfo = {
                phone:$scope.userPhone,
                password:$scope.userPassword
            };
            $http.post("/users/login",userInfo).success(function (data) {
                //if(data == "true"){;
                //    //$scope.pwdInfo = "........跳转中！";
                //    //$scope.tips5 = "true";
                //    $location.path("/home");
                //}else{
                //    $scope.pwdInfo = "密码错误请重新输入！";
                //    $scope.tips5 = "false";
                //}
                console.log(data);   //userObject
                if(data.length > 0 ){
                    $location.path("/home");
                    $http.get('/users/getUser').success(function (msg) {
                        $rootScope.user = msg;
                        $rootScope.u_id = msg[0].u_id;  //把用户ID暴露成全局在购物车使用
                    });
                    //console.log(data[0]);
                }else{
                    $scope.pwdInfo = "密码错误请重新输入！";
                    $scope.tips5 = "false";
                }
            })
        }
    }
});
