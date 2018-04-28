
(function($){
	'user strict';
	 function readerFile(obj){
	 		var file = obj.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			return reader
	 };	 
	 (function(){
	 	if($('.gender').data('sex') == '1'){
	 		$('.gender').html('男');
	 	}else{
	 		$('.gender').html('女');
	 	}
	 	var sex = $('.midity-sex').data('sex');
	 	$('.midity-sex input').each(function(i){
	 		if($(this).val() == sex){
	 			$(this).attr('checked','checked');
	 		}
	 	})
	 })();
	 $('.user-head').on('mouseenter mouseleave',function(){
	 	$('#midify_head').toggleClass('active');
	 });
	 $('#midify_head,#close_btn').on('click',function(){
	 	$('.midity-avatar').toggle();
	 });	
	 $('#midify_btn').on('click',function(){
	 	var miditydata = {};
	 	$('.modify-form input:text').each(function(i){
	 		if($(this).val()!=""){
	 			var id = $(this).attr('id');
	 			var name = id.substr(id.indexOf('_')+1);
	 			miditydata[name] = $(this).val(); 
	 		}
	 	});
	 	miditydata.sex = $('.midity-sex input:checked').val();
	 	$.ajax({
	 		url:'user/changedata',
	 		method:'POST',
	 		data:miditydata,
	 		dataType:'json',
	 		success:function(data){
	 			if(data.code == 0){
	 				$('.modify-form').hide();
	 				for( var key in miditydata){
	 					$('.'+key+'').html(miditydata[key]);
	 				};

	 			}
	 			else{
	 				alert('修改失败,请重试');
	 			}
	 		}
	 	})
	 });
	 $('#midify_back,.modify-btn').on('click',function(){
	 	$('.modify-form').toggle();
	 });

	$('#upload_btn').on('click',function(){
		
		$('#upload').click();
		$('#upload').on('change',function(){
			readerFile(this).onload = function(event){
				$('.head-show img').attr('src',event.target.result)
			};
		});
	});
	$('.submit_a').on('click',function(){		
		var formData = new FormData();
		var upload = document.getElementById('upload');
		var file = upload.files[0];
		formData.append("headimg",file);
		$.ajax({
			url:'/user/changehead',
			method:'POST',
			data:formData,
			processData:false,
			contentType:false,
			success:function(data){
				if(data.code == 0){
					 $('.user-head img').attr('src',data.imgsrc);
					 $('.midity-head').hide();
				}else{
					alert('网络连接失败，请重试');
				}
			}

		})
	});	
	function getnode(node){
		if(node.nodeName == 'A'){
			return node;
		}else{
			return getnode(node.parentNode);
		}
	}
	$('.user-nav ul').on('click',function(event){
	var target = $(getnode(event.target));
	var index = $(getnode(event.target)).parent().index();
	event.preventDefault();
	target.addClass('active').parent().siblings().children('a').removeClass('active');
	$('.user-data').children().eq(index+1).show().siblings().hide();
	if(target.attr('id')== 'order_data'){
		var url = target.attr('href');
		$.ajax({
		url:url,
		dataType:'json',
		method:'GET',
		success:function(data){
			console.log(data);
			 $('.order-main').append(data);
		}
	})
	}	
})
})(jQuery)