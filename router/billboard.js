const express = require('express');
const request = require('request');
const router = express.Router();
var apikey = '?apikey=0b2bdeda43b5688921839c8ecb20399b&count=10';
router.get('/',function(req,res){
	if(req.query.name){
		var name = req.query.name;
		request('https://api.douban.com/v2/movie/'+name+''+apikey+'',
		function(error,response,body){
			if(response.statusCode == 200&!error){
				res.data = JSON.parse(body);
				res.render('billboard_list',{data:res.data});	
			}
			else{
				res.send(error);
			}

		});
	}
	else{
		request('https://api.douban.com/v2/movie/weekly'+apikey+'',
		function(error,response,body){
			if(response.statusCode == 200&!error){
				res.data = JSON.parse(body) ;
				res.render('billboard',{data:res.data});
			}
			else{
				res.send(error);
			}

		});
	}	
})

module.exports = router;