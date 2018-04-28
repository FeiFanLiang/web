
(function($){
    'user strict';
    function Validate(container){
    this.container = $(container);
    this.init();
};
Validate.prototype = {
    init:function(){
        this.error();
        this.submitVa();
    },
    getVal:function(){
        var that = this;
        this.options={};
        this.container.find('input').each(function(i){
            var key = $(this).attr('id');
            var value = $(this).val()||0;
            that.options[key] = value;

        });
        

    },
    Validator:{
            username:function(str){
            var reg = /^[a-zA-Z0-9_-]{4,16}$/;
            return reg.test(str);
            },
            password:function(str){
                var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
                return reg.test(str);

            },
            phonecall:function(str){
                var reg = /^1[34578]\d{9}$/;
                return reg.test(str);
            },
            veriCode:function(str){
                var reg = /[a-zA-Z0-9_-]/;
                return reg.test(str);
            },
    },
    starVa:function(options){
        var that = this;
        
        for(key in that.options){   
           
            if(!that.Validator[key](that.options[key])){
                 return false;
            }

        }
        return true;
    },
    error:function(){
        var that = this;
        this.container.find('input').on('blur',function(){
            
            if(that.Validator[$(this).attr('id')]($(this).val())){
                $(this).parent().find('.error-msg').hide();
                return;
                
            }
            $(this).parent().find('.error-msg').show();
        })
    },
    submitVa:function(){
        var that = this;
        that.container.find('#submit-btn').on('click',function(event){
                event.preventDefault();
                that.getVal();
            if(!that.starVa()){
            alert('您的信息输入有误，请修改后提交');
            return;
            };  

        })
    }


};

var validate = new Validate('#regi_form');
$('#submit-btn').on('click',function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    var username = $('#username').val();
    var pwd = $('#password').val();
    var vericode = $('#veriCode').val();
    var phonenum = $('#phonecall').val();
    var data ={'username':username,'pwd':pwd,'vericode':vericode,'phonenum':phonenum};
    $.ajax({
        url:url,
        dataType:'json',
        data:data,
        method:'POST',
        success:function(data){
            if(data.code==1){
                alert('注册成功！');
                window.location.href='/login';
            }else if (data.code==0) {
                alert('失败！');
            }
        }
    })
})
})(jQuery);