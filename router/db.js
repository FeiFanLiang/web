const mysql = require('mysql');
const db = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'1234',
	database:'demo'
});

module.exports = db;
