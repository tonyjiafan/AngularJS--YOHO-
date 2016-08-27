
var mysql = require("mysql");

function getConn(){
    return mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"111111",
        database:"yohobuy"
    });
}

var query = function (sql,params,callback) {
    var conn = getConn();
    conn.query(sql,params, function (err,data) {
        if(err){
            console.log(err);
        }else{
            callback(data);
        }
    });
    conn.end();
};



var queryByPage = function(sql, curPage, eachPage, params, callback) {

    var conn = getConn();
    conn.query("select count(*) cnt from (" + sql +") e", params, function(err, data) {

        var count = data[0].cnt;

        if(count == 0) {
            callback("0");
        } else {
            var maxPage = Math.ceil(count / eachPage);//math.ceil是向上取整。如5.1取6, 5.5取6。
            sql += " limit " + (curPage - 1) * eachPage + "," + eachPage;
            conn.query(sql, params, function(err, data) {
                //将数据page传回表现层
                var page = {
                    curPage: curPage,
                    eachPage: eachPage,
                    maxPage: maxPage,
                    count: count,
                    data: data
                };
                callback(page);

                conn.end();
            });
        }
    })
};








exports.query = query;
exports.queryByPage = queryByPage;