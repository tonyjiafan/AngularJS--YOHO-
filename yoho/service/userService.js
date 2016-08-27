var userDao = require('../Dao/userDao');

//登陆
exports.login = function (phone,password,callback) {
    userDao.login(phone,password, function (data) {
       //if(data[0].cnt === 1){
       //     callback("true");
       //}else{
       //    callback("false");
       //}
        callback(data);
    })
};
/*------登陆用户名验证---------*/
exports.isPhone = function (phone,callback) {
    userDao.isPhone(phone, function (data) {
        if(data[0].cnt === 1){
            callback("true");
        }else{
            callback("false");
        }
    })
};

//-----注册用户名验证-----------------------------------------
exports.reg = function (phone,callback) {
    userDao.reg(phone, function (data) {
        if(data[0].cnt >= 1){
            callback("true");
        }else{
            callback("false");
        }
    })
};
//--------注册添加----------------------------------------
exports.addReg = function (phone,password,callback) {
    userDao.addReg(phone,password, function (data) {
        if(data.affectedRows == 1){
            callback("true");
        }else{
            callback("false");
        }
    })
};

//--------获取列表----------------------------------------
exports.getAll = function (callback) {
    userDao.getAll(function(data) {
        callback(data);
    })
};


//往购物车添加数据购物车
exports.addCar = function (userID,shopID,cnt,size,callback) {
    userDao.addCar(userID,shopID,cnt,size,function(data) {
        callback(data);
    })
};

//往购物车添加数据购物车【移动端】
exports.MobileAddCar = function (userID,shopID,callback) {
    userDao.MobileAddCar(userID,shopID,function(data) {
        callback(data);
    })
};




//=================获取购物车列表===========================
exports.getCar = function (userId,callback) {
    userDao.getCar(userId,function(data) {
        callback(data);
    })
};


//=======================详情页面展示数据获取
exports.showInfoId = function (jieshouListId,callback) {
    userDao.showInfoId(jieshouListId,function(data) {
        callback(data);
    })
};

//--------模糊查询
exports.search = function (shopName,callback) {
    userDao.search(shopName,function(data) {
        callback(data);
    })
};

//购物车数量增减
exports.carChange = function (count,uid,pid,callback) {
    userDao.carChange(count,uid,pid,function(data) {
        callback(data);
    })
};


//===========删除购物车商品
exports.delCar = function (uid,pid,callback) {
    userDao.delCar(uid,pid,function(data) {
        callback(data);
    })
};


