
(function($){
 'user strict';
 function Slider(container,options){   
   if(options){
    this.options = options;
  }else{
    this.options = '';
  }
  this.width = this.options.width||'100%';
  this.height = this.options.height||'100%';
  this.interval = this.options.interval||5000;
  this.unit = $(container+' .slider').children();
  this.control = $(container+' .slider-control ul').children();
  this.num = 0;
  this.init();


}

Slider.prototype = {
 init:function(){
  
  this.setTime();
  this.bindEvent();
},
sliderout:function(){
  
  this.unit.eq(this.num).toggleClass('active');
  this.control.eq(this.num).toggleClass('slider-control-active');
},
setTime:function(){
  var that = this;
  this.timer =setInterval(function(){
   
   that.sliderout();
   that.num++;
   if(that.num>that.unit.length-1){
     that.num=0;
   }
   
   that.sliderout();
 },this.interval);
},
bindEvent:function(){
  var that = this;
  this.control.on('click',function(){
    clearInterval(that.timer);
    if(that.num==$(this).index()){
     return;
   }
   that.sliderout();
   that.unit.eq($(this).index()).toggleClass('active');
   that.control.eq($(this).index()).toggleClass('slider-control-active');
   that.num=$(this).index();
   setTimeout(that.setTime(),5000);
   
 });


},



};
(function goTop(){
 $(window).on("scroll",function(){
   
   if($(this).scrollTop()>300){
    $('.corner-btn').show();
  }else{
    $('.corner-btn').hide();
  }
});
 $('.up-btn').on('click',function(){
   $(window).scrollTop(0);
 });
})();
$('.search-btn').on('click',function(){
 $(window).scrollTop(0);
 $('.topsearch').show();
});
$('.region-current').on('click',function(){
 $('.region-selec').show();
})
$('#close-btn').on('click',function(){
 $('.region-selec').hide();
})
$('.mainland-date').each(function(i){
  var maindate = $(this).data('date').split('-');
  $(this).html(parseInt(maindate[1])+'月'+parseInt(maindate[2])+'日上映');
});
(function loadCitylist(){
  if(!window.localStorage.getItem('citylist')){
    $.ajax({
      url:'./getcity',
      method:'get',
      dataType:'html',
      success:function(data){
        console.log(data);
        $('.region-list-warp').append(data);
        window.localStorage.setItem('citylist',data);
      },
      error:function(){
        alert('城市列表加载失败，请刷新页面重试');
      }
    })
  }


})();

$('.citylist').on('click',function(event){
 var target = $(event.target);
 var region = $.trim(target.html());
 if(target.is('li') && region !=$.trim($('.region-current').html())){
  var data = {'region':region};
  $.ajax({
   url:'/region',
   method:'GET',
   data:data,
   dataType:'html',
   success:function(data){
    $('.hotList').html(data);
    $('.region-current').html(target.html());
  },
  error:function(textStatus){
    console.log(textStatus);
  }
})
}
});
$('.log-off a').on('click',function(event){
  var url = $(this).attr('href');
  event.preventDefault();
  $.ajax({
    url:url,
    dataType:'json',
    method:'GET',
    success:function(data){
      console.log(data);
      if(data.code == 0){
        alert('退出成功');

      }
      else{
        alert('退出失败');
      }
    }
  })
})
var topSlider=new Slider('#headslider');

(function loadData(obj,fn){  
  var clocker = null;
  var delaytime = 1000;
  function innerKeydown(fn){
    if(clocker == null){
      clocker = setTimeout(fn,delaytime);
    }
    else{
      clearTimeout(clocker);
      clocker = setTimeout(fn,delaytime);
    };
  }
  obj.on('keyup',function(){ 
    innerKeydown(fn);
    if(obj.val()==''){
      $('.search-result').hide();
    }
  });
  
  
})($('#serach_input'),function(){
  var q = $('#serach_input').val();
  if(q){
   $.ajax({
    url:'/search',
    dataType:'html',
    method:'get',
    data:{'q':q},
    success:function(data){
      $('.search-result').show().html('').append(data);  
    }
  })
 }  
});
})(jQuery);
