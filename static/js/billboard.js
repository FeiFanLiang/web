
(function($){
	 'user strict';
	$('.tab-select ul').on('click',function(event){
	 event.preventDefault();
	 var href = $(event.target).attr('href');
	 var className = '#'+href.substr(6);
	 $(event.target).addClass('active').parent().siblings().children('a').removeClass('active');
	 if(!$(className).data('fill')&& className!= '#weekly'){
	 	$.ajax({
		url:href,
		dataType:'html',
		method:'get',
		async:false,
		success:function(data){	
			$(className+' ul').append(data);
			$(className).data('fill','true');
		},
		error:function(XMLHttpRequest){
			console.log(XMLHttpRequest);
		}
	})
	 }
	$(className).show().siblings().hide();	
});
})(jQuery);