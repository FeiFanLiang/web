
(function($){
	'user strict';
	$.ajax({
		url:'/login/getcart',
		method:'GET',
		dataType:'json',
		success:function(data){
			if(data.code == 0){
				return;
			}
			else{
				$('.cart-num').html(window.localStorage.getItem('cart-num'));
			}
		}
	});
	$('#msg_tab div').on('click',function(){
	$('.content').children().eq($(this).index()).show().siblings().hide();
	$(this).addClass('active').siblings().removeClass('active');
})
var wid = $('body').width();
var hei = $('body').height();
$('.video-mask').height(hei);
	$('.video-mask').width(wid);
$('.icon-star').width(Math.round(parseInt($('.movie-score span').html())/10*5)*16);
$('.play-btn').on('click',function(event){
	event.preventDefault();
	var videoSrc = $(this).attr('href');
	$('.video-mask').show();
	$('.video video').attr('src',videoSrc);

});
$('.icon-close').on('click',function(){
	$('.video-mask').hide();
	$('.video video').attr('src','');
});
$('.buy').on('click',function(event){
	event.preventDefault();
	var price = $(this).data('price');
	var cartid = {"id":price.id};
	var carnum = parseInt($('.cart-num').html())+1;
	$.ajax({
		url:'/buy',
		dataType:'json',
		method:'POST',
		success:function(data){
			$('.num-change').show().fadeOut(1000);
			if(data.code == 0){
				$.ajax({
					url:'/buy/buy',
					data:cartid,
					method:'POST',
					error:function(){
					console.log('添加失败');	
						$('.cart-num').html(carnum-1);
					}
				});
			}
			else{
				window.localStorage.setItem('cart-num',''+carnum+'');
			}
			$('.cart-num').html(carnum);
		},
		error:function(){
				alert('网络连接错误，请刷新后重试');

		}
	});
	

})
})(jQuery)


