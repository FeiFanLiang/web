const express = require('express');
const router = express.Router();
const db = require('./db');
const request = require('request');
var apikey = 'apikey=0b2bdeda43b5688921839c8ecb20399b';
router.get('/',function(req,res,next){
	request('https://api.douban.com/v2/movie/in_theaters?'+apikey+'&count=10',
	   function(error,response,body){
	    if(!error && response.statusCode == 200) {
	        res.theaters = JSON.parse(body);
	        next();
	    }
	    else{
	        console.log(error);
	    }
	    	});

	});		
router.get('/',function(req,res,next){
	request('https://api.douban.com/v2/movie/coming_soon?'+apikey+'&count=6',
	   function(error,response,body){
	    if(!error && response.statusCode == 200) {
	        res.coming = JSON.parse(body);
	        next();
	    }
	    else{
	        console.log(error);
	    }
	    	});

});
router.get('/',function(req,res,next){
	request('https://api.douban.com/v2/movie/top250?'+apikey+'&count=6',
	   function(error,response,body){
	    if(!error && response.statusCode == 200) {
	        res.top= JSON.parse(body);
	        next();
	    }
	    else{
	        console.log(error);
	    }
	});

});
// router.get('/',function(req,res,next){
// 	request('http://api.shenjian.io/?appid=9904a4af221241afc3d0f6d614c7f9fc',
// 	   function(error,response,body){
// 	    	if(!error && response.statusCode == 200) {
// 	        res.rating = JSON.parse(body); 	
// 	        next();
// 	        }
// 	        else{
// 	        	console.log(error);
// 	        	}
// });
// 		});


		router.get('/',function(req,res){
			res.rating={"error_code":0,"data":[{"Irank":"1","MovieName":"狂暴巨兽","BoxOffice":"339.03","sumBoxOffice":"43871.64","movieDay":"6","boxPer":"48.76","time":"2018-04-18 0:14:23"},{"Irank":"2","MovieName":"头号玩家","BoxOffice":"131.27","sumBoxOffice":"123118.86","movieDay":"20","boxPer":"18.88","time":"2018-04-18 0:14:23"},{"Irank":"3","MovieName":"厉害了，我的国","BoxOffice":"83.59","sumBoxOffice":"46789.98","movieDay":"48","boxPer":"12.02","time":"2018-04-18 0:14:23"},{"Irank":"4","MovieName":"湮灭","BoxOffice":"47.84","sumBoxOffice":"4694.40","movieDay":"6","boxPer":"6.88","time":"2018-04-18 0:14:23"},{"Irank":"5","MovieName":"起跑线","BoxOffice":"33.55","sumBoxOffice":"19041.47","movieDay":"15","boxPer":"4.83","time":"2018-04-18 0:14:23"},{"Irank":"6","MovieName":"暴裂无声","BoxOffice":"8.37","sumBoxOffice":"5112.12","movieDay":"15","boxPer":"1.20","time":"2018-04-18 0:14:23"},{"Irank":"7","MovieName":"寻找罗麦","BoxOffice":"7.76","sumBoxOffice":"352.05","movieDay":"6","boxPer":"1.12","time":"2018-04-18 0:14:23"},{"Irank":"8","MovieName":"红海行动","BoxOffice":"7.43","sumBoxOffice":"363845.03","movieDay":"62","boxPer":"1.07","time":"2018-04-18 0:14:23"},{"Irank":"9","MovieName":"西北风云","BoxOffice":"6.99","sumBoxOffice":"348.67","movieDay":"6","boxPer":"1.01","time":"2018-04-18 0:14:23"},{"Irank":"10","MovieName":"冰雪女王3：火与冰","BoxOffice":"5.26","sumBoxOffice":"5596.29","movieDay":"14","boxPer":"0.76","time":"2018-04-18 0:14:23"},{"Irank":"11","MovieName":"其它","BoxOffice":"24.25","sumBoxOffice":"0.00","movieDay":"0","boxPer":"1.00","time":"2018-04-18 0:14:23"}],"reason":"success"}
			res.render('index',{theaters:res.theaters,coming:res.coming,top:res.top,rating:res.rating});
		});
router.get('/region',function(req,res){
	var region = encodeURI(req.query.region);
	request('https://api.douban.com/v2/movie/in_theaters?'+apikey+'&count=9&city='+region+'',
		function(error,response,body){
			if(!error && response.statusCode == 200){
				var body = JSON.parse(body);
				res.render('index_citylist',{data:body});
			}
			else{
				console.log(error);
			}
		});	

});
router.get('/search',function(req,res){
	var q = encodeURI(req.query.q);
	 request('https://api.douban.com/v2/movie/search?q='+q+'&'+apikey+'',
	 	function(error,response,body){
	 		if(!error&& response.statusCode == 200){
	 			var body = JSON.parse(body);
	 			res.render('order_template',{data:body});
	 		}
	 	})
});
router.get('/getcity',function(req,res){
	db.getConnection(function(err,connection){
		if(err){
			throw err;
		}
		connection.query(`SELECT * FROM city WHERE id='1'`,
			function(err,data){
			if(err){
				console.log(err);
			}
			var citylist = JSON.parse(data[0].city);
			console.log(citylist.provinces[0].name);
			res.render('index_citylist',{data:citylist});
		})
	})
})
module.exports = router;