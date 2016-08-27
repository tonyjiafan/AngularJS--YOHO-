
var indexApp = angular.module("indexApp",["ui.router","regApp","loginApp","homeApp","listApp","infoApp","carApp"]);
//配置路由
indexApp.config(function ($urlRouterProvider,$stateProvider) {
    $urlRouterProvider.when("","reg");
    $stateProvider.state("reg",{
        url:"/reg",
        templateUrl:"./reg.html",
        controller:"regController"
    });
    $stateProvider.state("login",{
        url:"/login",
        templateUrl:"./login.html",
        controller:"loginController"
    });
    $stateProvider.state("home",{
        url:"/home",
        templateUrl:"./home.html",
        controller:"homeController"
    });
    $stateProvider.state("list",{
        url:"/list",
        templateUrl:"./list.html",
        controller:"listController"
    });
    $stateProvider.state("info",{
        url:"/info",
        templateUrl:"./info.html",
        controller:"infoController"
    });
    $stateProvider.state("car",{
        url:"/car",
        templateUrl:"./car.html",
        controller:"carController"
    });
});