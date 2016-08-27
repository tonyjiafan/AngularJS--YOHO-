var regApp = angular.module("regApp",[]);

regApp.controller("regController", function ($scope,$location,$http,$rootScope) {

    //session对象
    $http.get('/users/getUser').success(function (data) {
        $rootScope.user = data;
    });

    var statePhone;
    /*----注册用户名重复验证----------*/
    $scope.isUsername = function () {
        function phone (){
            if($scope.isPhone && /^[1][3458]\d{9}$/.test($scope.isPhone)){
                var userData= {
                    phone:$scope.isPhone
                };
                $http.post("/users/reg",userData).success(function (data) {
                    if(data == "false"){
                        //console.log("in");
                        $scope.userInfo = "用户名通过！";
                        $scope.tips = "true";
                        statePhone = 1
                    }else{
                        $scope.userInfo = "用户已存在！";
                        $scope.tips = "false";
                        //console.log("2");
                        statePhone = 0
                    }
                })
            }else{
                $scope.userInfo = "用户名格式错误！";
                $scope.tips = "false";
                statePhone = 0
            }
        }
        phone ()
    };
    /*
     /(?=^.{8,15}$)(?=(?:.*?\d){2})(?=.*[a-z])(?=(?:.*?[A-Z]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&]*$/
     密码长度8-15，自己改变数字可以调节,至少一个特殊字符, 至少1个数字,a-z的小写字母 ,至少1个大写字母

    */
    /*---------验证密码格式----------*/
    $scope.isPassword = function () {
        if ($scope.isPwd && /(?=^.{8,15}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[A-Z]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&]*$/.test($scope.isPwd)) {
            $scope.pwdInfo = "密码格式正确！";
            $scope.tips2 = "true";
            statePassword = 1
        }else{
            $scope.pwdInfo = "密码格式错误！";
            $scope.tips2 = "false";
            statePassword = 0
        }
    };
    ///*------------------注册添加---------------*/
    $scope.isReg = function () {
        if(statePhone === 0 || statePassword === 0){
            $scope.addInfo = "注册信息有误请重新填写！";
            $scope.tips3 = "false";
        }else{
            var userInfo ={
                phone:$scope.isPhone,
                password:$scope.isPwd
            };
            $http.post("/users/addReg",userInfo).success(function (data) {
                if(data == "true"){
                    $location.path("/login");
                    //$scope.addInfo = "注册成功！";
                    //$scope.tips3 = "true";
                }
            })
        }
    }
});
