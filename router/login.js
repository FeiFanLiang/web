const express = require('express');
const db = require('./db');
const router = express.Router();
router.get('/',function(req,res){
	res.render('login');
});
router.post('/verify',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	db.getConnection(function(err,connection){
		if(err){
			throw err;
		}
		connection.query(`SELECT * FROM user WHERE username = '${username}'`,
			function(err,data){
				if(err){
					throw err;
					res.json({'code':4});
				}else{
					if(data.length == 0){
						res.json({'code':1});
					}
					else{
						
						if(data[0].psw == password){						
							req.session.user_id=data[0].ID;
							req.session.nickname= data[0].nickname;
							connection.query(`SELECT id FROM cartlist WHERE id=1`,
								function(err,data){
									if(err){
										throw err;
									}
									var cartnum = data.length;
									req.session.cart = cartnum;
									res.json({'code':0});
								})
							
						}else{
							res.json({'code':2});
						}
					}
				}
			})
	})
	

});
router.get('/logoff',function(req,res){
	req.session.user_id = null;
	res.json({'code':0});
});
router.get('/getcart',function(req,res){
	if(req.session.user_id){
		res.json({"code":0});
	}
	else{
		res.json({"code":1});
	}
})
module.exports = router;