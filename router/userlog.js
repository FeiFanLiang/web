function userlog(req,res,next){
	if(req.session.user_id){
		res.locals.nickname = req.session.nickname;
		res.locals.cartnum = req.session.cart;
		next()
	}else{
		next();
	}
}
module.exports = userlog;