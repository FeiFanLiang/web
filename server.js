const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookies = require('cookie-parser');
const cookSession = require('cookie-session');
const request = require('request');

const index = require('./router/index');
const billboard = require('./router/billboard');
const movie = require('./router/movie');
const login = require('./router/login');
const regin = require('./router/regin');
const user = require('./router/user');
const userlog = require('./router/userlog');
const buy = require('./router/buy');

const server = new express();




server.set('view engine','ejs');
server.set('views','./views');

var str = 'mycookiessigned';
var arr = ['mycookiesessionkey1','mycookiesessionkey2','mycookiesessionkey3'];
server.use(cookies(str));
server.use(cookSession({
	name:'sessionid',
	maxAge:1000*60*60*24,
	keys:arr
}));
server.use(express.static('static'));
server.use(bodyParser.urlencoded({extended:false}));
server.use(userlog);
server.use('/',index);
server.use('/billboard',billboard);
server.use('/movie',movie);
server.use('/login',login);
server.use('/regin',regin);
server.use('/user',user);
server.use('/buy',buy);
server.listen(3000);
console.log('已经监听3000端口');
//新增加注释