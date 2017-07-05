var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* 获取主页新闻的请求 */
router.get('/', function(req, res, next) {

  	var newstype = req.query.newstype;
  	console.log(newstype);

 	var connection = mysql.createConnection({
		host     : 'localhost',
		port	   : "3306", 
		user     : 'root',
		database : 'news'
	});

	connection.connect();
	connection.query('SELECT * FROM `news` WHERE `newstype` = ?', [newstype], function (error, results, fields) {//第二个：可以是查询的参数；第三个参数：回调函数
  		if (error) throw error;
  		// console.log('req*******'+results);
  		res.json(results);
	});
 
connection.end();
});

module.exports = router;
