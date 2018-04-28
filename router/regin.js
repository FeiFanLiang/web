const express = require('express');
const db = require('./db');
const router = express.Router();
router.get('/',function(req,res){
	res.render('regi');
});
router.post('/news',function(req,res){
	var userdata = req.body;
	var addsql = 'INSERT INTO user(username,psw,phonenum)VALUES(?,?,?)';
	var new_user = [""+userdata.username+"",""+userdata.pwd+"",""+userdata.phonenum+""];
	db.getConnection(function(err,connection){
		connection.query(`SELECT username FROM user WHERE username='${userdata.username}'`,
			function(err,data){
			if(err){
				console.log(err);
			}else{
				
				if(data.length!= 0){
					res.json({'code':'0','msg':'该用户名已经被注册'});
				}else{				
				connection.query(addsql,new_user,
					function(err,data){
						if(err){
							console.log(err);
						}
						else{
							res.json({'code':'1','msg':'成功'});
							connection.end();
						}
						})
					
				}
			}
		})
	})
	
})
module.exports = router;