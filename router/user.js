const express = require('express');
const db = require('./db');
const ejs = require('ejs');
const multer = require('multer');
const router = express.Router();
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './static/images');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({storage:storage}).single('headimg');
router.use('/',function(req,res,next){
	if(req.session.user_id){
		next();
	}
	else{	
		res.redirect(302,'../login');
	}
});
router.get('/',function(req,res){
	console.log(3);
	db.getConnection(function(err,connection){
		connection.query(`SELECT * FROM user WHERE id='${req.session.user_id}'`
			,function(err,data){
				var data = data[0];
				res.render('user',{data:data});
			})
	})	
});
router.get('/userdata',function(req,res){
	db.getConnection(function(err,connection){
		connection.query(`SELECT * FROM cartlist WHERE id='${req.session.user_id}'`,
			function(err,data){
				var str =`<div class="order-list">
				<ul>
				<% for(var i=0;i<data.length;i++) { %>
					<li>
					<span><%= data[i].orderId %></span>
					<span><%= data[i].orderName %></span>
					<span><%= data[i].price %></span>
					<span><%= data[i].orderDate %></span>
					</li>
					<% } %>
					</ul>
					</div>`;
					res.locals.userdata = data;
					var html = ejs.render(str,{data:data});
					res.json(html);
				})
	})
});
router.post('/changehead',function(req,res){
	upload(req,res,function(err){
		if(err){
			res.json({'code':1});
		}
		else{			
			var path = req.file.path.substr(6).replace(/\\/g,"/");			
			db.getConnection(function(err,connection){
				if(err){
					res.json({'code':1});
					throw err;
				}
				else{
					connection.query(`UPDATE user SET avatar='${path}' WHERE id='${req.session.user_id}'`,
						function(err,data){
							if(err){
								res.json({'code':1});
								throw err;
							}
							else{
								res.json({'code':0,'imgsrc':path});
							}
						})
				}
			})
		}
	})
	
});
router.post('/changedata',function(req,res){
	var data = req.body;
	var sqltext = 'UPDATE user SET ';
	for(key in data){
		var sql = ""+key+"='"+data[key]+"'";
		sqltext += sql+","; 
	}
	sqltext = sqltext.substr(0,sqltext.length-1);
	db.getConnection(function(err,connection){
		if(err){
			throw err;
		}else{
			connection.query(sqltext+" WHERE id='"+req.session.user_id+"'",
				function(err,data){
					if(err){
						throw err;
					}
					else{
						res.json({'code':0});
					}
				})
		}
	})
})
module.exports = router;