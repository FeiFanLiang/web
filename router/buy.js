const express = require('express');
const db = require('./db');
const router = express.Router();
router.post('/',function(req,res){
	console.log(req.session.cart);
	if(req.session.user_id){	
		res.json({'code':0});
	}else{
		res.json({'code':1});
	}
});
router.post('/buy',function(req,res){
	var data = req.body;
	var sqltext = `INSERT INTO cartlist(id,orderid) VALUES(?,?)`;
	var dataarr = [""+req.session.user_id+"",""+data.id+""];
		db.getConnection(function(err,connection){
			connection.query(sqltext,dataarr,function(err,data){
				if(err){
					res.send('数据库连接失败');
					throw err;
				};

				connection.query(`SELECT id FROM cartlist WHERE id=1`,
					function(err,data){
						if(err){
							throw err;
						}
						var cartnum = data.length;
						req.session.cart = cartnum;
						res.end();
					})
			})
		})

		
})
module.exports = router;
