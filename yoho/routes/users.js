var express = require('express');
var router = express.Router();
//
var userService = require('../service/userService');
var mysql = require("mysql");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//获取session中的用户对象
router.get('/getUser', function (req,res) {
  var user = req.session.user;
  if(user){
    res.send(user);
  }else{
    res.send("");
  }
});


//注销
router.get('/logOut', function (req,res) {
    req.session.user = null;
    res.send("");
});



//----------------login----------------------------
router.post('/login', function (req,res) {
  var phone = req.body.phone;
  var password = req.body.password;
  userService.login(phone,password,function(data){
     if(data.length > 0){
       //登陆成功后获取用户名
       req.session.user = data;
     }
    res.send(data);
  })
});

/*------登陆用户名验证---------*/
router.post('/PhoneS', function (req,res) {
  var phone = req.body.phone;
  userService.reg(phone,function(data){
    res.send(data);
  })
});


//------------------------------------------------
router.post('/reg', function (req,res) {
  var phone = req.body.phone;
  userService.reg(phone,function(data){
    res.send(data);
  })
});
//---------------------------------------------------
router.post('/addReg', function (req,res) {
  var phone = req.body.phone;
  var password = req.body.password;
  userService.addReg(phone,password,function(data){
    res.send(data);
  });
});


//获取列表
router.post('/getAll', function (req,res) {
  userService.getAll(function(data){
    res.send(data);
  });
});


//往购物车添加数据购物车【PC端】
router.post('/addCar', function (req,res) {
  var userID = req.body.userID;
  var shopID = req.body.shopID;
  var cnt = req.body.cnt;
  var size = req.body.size;
  //console.log(userID,shopID,cnt,size);
  userService.addCar(userID,shopID,cnt,size,function(data){
    res.send(data);
  });
});


//往购物车添加数据购物车【移动端】
router.post('/MobileAddCar', function (req,res) {
  var userID = req.body.userID;
  var shopID = req.body.shopID;
  //console.log(userID,shopID,cnt,size);
  userService.MobileAddCar(userID,shopID,function(data){
    res.send(data);
  });
});



//=================获取购物车列表===========================
router.post('/getCar', function (req,res) {
  var userId = req.body.userID;
  //console.log("========");
  //console.log(userId);
  userService.getCar(userId,function(data){
    //console.log(data);
    res.send(data);
  });
});

//=======================详情页面展示数据获取
router.post('/showInfoId', function (req,res) {
  var jieshouListId=req.body.jieshouListId;
  userService.showInfoId(jieshouListId,function(data){
    res.send(data);
  });
});
//--------模糊查询

router.post('/search', function (req,res) {
  var shopName=req.body.shopName;
  console.log(shopName);
  userService.search(shopName,function(data){
    res.send(data);
  });
});


//购物车数量增减
router.post('/carChange', function (req,res) {
  var uid=req.body.uid;
  var pid=req.body.pid;
  var count=req.body.count;
  userService.carChange(count,uid,pid,function(data){
    res.send(data);
  });
});

//===========删除购物车商品
router.post('/delCar', function (req,res) {
  var uid=req.body.uid;
  var pid=req.body.pid;
  userService.delCar(uid,pid,function(data){
    res.send(data);
  });
});






module.exports = router;
