const express = require('express');
const request = require('request');

const router = express.Router();
router.get('/:path',function(req,res){
	var path = req.path;
	request('https://api.douban.com/v2/movie/subject'+path+'?apikey=0b2bdeda43b5688921839c8ecb20399b',
		function(error,response,body){
			if(!error&&response.statusCode==200){
				res.data = JSON.parse(body);
				res.render('movie',{data:res.data});
			}
		})
});


module.exports = router;