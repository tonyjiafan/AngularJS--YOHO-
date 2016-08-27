
var database = require('./database');

/*===============登陆==========================*/
exports.login = function (phone,password,callback) {
    database.query("select * from t_user t where t. u_name = ? and t.u_pwd = ?",[phone,password], function (data) {
        callback(data);
    })
};
/*------登陆用户名验证---------*/
exports.isPhone = function (phone,callback){
    database.query("select count(*) cnt from t_user t where t. u_name = ?",[phone], function (data) {
        callback(data);
    })
};

//==============注册验证========================

exports.reg = function (phone,callback){
    database.query("select count(*) cnt from t_user t where t. u_name = ?",[phone], function (data) {
        callback(data);
    })
};

//=================注册添加============================

exports.addReg = function (phone,password,callback){
    database.query("insert into t_user (u_name,u_pwd) values (?,?)",[phone,password], function (data) {
        callback(data);
        //console.log(data);
    })
};


//=================获取列表===========================

exports.getAll = function (callback){
    database.query("select * from t_product",[],function (data) {
        callback(data);
        //console.log(data);
    })
};

//====================往购物车添加数据购物车
exports.addCar = function (userID,shopID,cnt,size,callback){
    database.query("insert into t_shopcar (sc_u_id,sc_p_id,sc_count,sc_size) values(?,?,?,?)",[userID,shopID,cnt,size], function (data) {
        //console.log(data);
        callback(data);
    })
};

//===============【移动端】=====往购物车添加数据购物车
exports.MobileAddCar = function (userID,shopID,callback){
    database.query("insert into t_shopcar (sc_u_id,sc_p_id) values(?,?)",[userID,shopID], function (data) {
        //console.log(data);
        callback(data);
    })
};


//=================获取购物车列表===========================

exports.getCar = function (userId,callback){
    database.query("select * from t_shopcar join t_product on p_id = sc_p_id where sc_u_id = ?",[userId],function (data) {
        callback(data);
        console.log(data);
    })
};

//=======================详情页面展示数据获取
exports.showInfoId = function (jieshouListId,callback){
    database.query("select * from t_product where p_id=?",[jieshouListId],function (data) {
        callback(data);
        //console.log(data);
    })
};
//---------------------------模糊查询
exports.search = function (shopName,callback){
    database.query("select * from t_product where p_name like ?",["%"+ shopName + "%"], function (data) {
        console.log(data);
        callback(data);
    })
};

//类显示  ------------未完成
//exports.type = function (typeId,callback){
//    database.query("select * from t_product where p_t_id = ? ",[typeId], function (data) {
//        //console.log(data);
//        callback(data);
//    })
//};



//购物车数量增减
exports.carChange = function (count,uid,pid,callback){
    //console.log(uid);
    //console.log(pid);
    //console.log(count);
    database.query("update t_shopcar set sc_count = ? where sc_u_id = ? and sc_p_id = ?",[count,uid,pid], function (data) {
        callback(data);
    })
};


//===========删除购物车商品
exports.delCar = function (uid,pid,callback){
    database.query("delete from t_shopcar where sc_u_id = ? and sc_p_id = ?",[uid,pid], function (data) {
        callback(data);
    })
};



