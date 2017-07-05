var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createPool({
	host     : 'localhost',
	port	   : "3306", 
	user     : 'root',
	database : 'news'
});

//后台路由页面
/* 获取所有新闻列表 */
router.get('/getnews', function(req, res, next) {
  	connection.query('SELECT * FROM `news`', function (error, results, fields) {//第二个：可以是查询的参数；第三个参数：回调函数
  		if (error) throw error;
  		res.json(results);
	});
});

//模态框取值
router.get('/curnews', function(req, res, next) {
	var id = req.query.id;
  	connection.query('SELECT * FROM `news` WHERE id=?', [id],  function (error, results, fields) {//第二个：可以是查询的参数；第三个参数：回调函数
  		if (error) throw error;
  		res.json(results);
	});
});

//更新
router.post('/updatenews', function(req, res){
	var newsid = req.body.newsid,
		newstype = req.body.newstype,
		newstitle = req.body.newstitle,
		newsimg = req.body.newsimg,
		newstime = req.body.newstime,
		newssrc = req.body.newssrc;

	connection.query('UPDATE `news` SET `newstitle`=?, `newstype`=?, `newsimg`=?, `newstime`=?, `newssrc`=? WHERE `id`=?', 
		[newstitle, newstype, newsimg, newstime, newssrc, newsid], 
		function(err, rows) {
			if (err) {
            	res.json({ "UPDATE": "fail" });
            }else{
                res.json({ "UPDATE": "success" });
            }
	})
});

router.post('/deletenews', function(req, res){
	var newsid = req.body.newsid;

	connection.query('DELETE FROM `news` WHERE id=?', [newsid], 
		function(err, rows) {
			if (err) {
            	res.json({ "DELETE": "fail" });
            }else{
                res.json({ "DELETE": "success" });
            }
	})
});

router.post('/insertnews', function(req, res){
	var newstype = req.body.newstype,
		newstitle = req.body.newstitle,
		newsimg = req.body.newsimg,
		newstime = req.body.newstime,
		newssrc = req.body.newssrc;

	connection.query('INSERT INTO `news`( `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES (?, ?, ?, ?, ?)', 
		[newstype, newstitle, newsimg, newstime, newssrc], 
		function(err, rows) {
			if (err) {
            	res.json({ "INSERT": "fail" });
            }else{
                res.json({ "INSERT": "success" });
            }
	})
});
module.exports = router;
