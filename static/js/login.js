$('#login-btn').on('click',function(event){
	event.preventDefault();
	var username = $.trim($('.username input').val());
	var password = $.trim($('.password input').val());
	var data ={'username':username,'password':password};
	var url = $(this).attr('href');
	if(data.username&&data.password){
		$.ajax({
			url:url,
			data:data,
			method:'POST',
			dataType:'json',
			success:function(data){
				if(data.code == 0){
					alert('登陆成功');
					window.location.href = '/';	
				}else if(data.code == 1){
					$('.username .error-msg').show();
				}else if(data.code ==2){
					$('.password .error-msg').show();
				}else{
					alert('登录失败');
				}
			}
		})
	}
	else{
		alert('用户名或密码不能为空');
	}
})