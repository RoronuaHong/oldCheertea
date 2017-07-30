/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-12-12
 * Time: 下午6:10
 * 图片的预加载
 * To change this template use File | Settings | File Templates.
 */
/**************
 * 预加载
 **************/
function _PreLoadImg(b, e) {
    var c = 0,
        a = {},
        d = 0;
    for (src in b) {
        d++;
    }
    for (src in b) {
        a[src] = new Image();
        a[src].onload = function() {
            if (++c >= d) {
                e(a)
            }
        };
        a[src].src = b[src];
    }
}

_PreLoadImg([
   'images/bg.png',
   'images/logo.png'
    ],function(){
    setTimeout(function(){
        var loader = document.getElementById('loading'),
            container = document.getElementById('swiper-container');
swiper.slideTo(1, 1000, false);
        document.body.removeChild(loader);
        container.style.display = 'block';
    },2000);
});
    var swiper = new Swiper('.swiper-container', {
		loop : true,
		direction : 'vertical',
        effect: 'cube',
		setWrapperSize :true,
		nextButton:'.swiper-button-next',

		cube: {
		  slideShadows: false,
		  shadow: false,
		  shadowOffset: 0,
		  shadowScale: 0
		},
		 onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        	   swiperAnimateCache(swiper); //隐藏动画元素 
        	   swiperAnimate(swiper); //初始化完成开始动画
        	 }, 
          onTransitionStart: function(swiper){
              swiperAnimate(swiper);
            }
    });

    var phonevegs = /^1[0-9]{10}$/;           // 需要1开头
        $('.submit').click(function(){
            if($("#name").val() && $("#member").val()) {  
                if($(".tels").val().match(phonevegs)) {

                    $.ajax({
                          url:'/shop/register.do',//baseUrl + '/shop/admin/register!register',
                          type:'post',
                          xhrField: {
                            withCredentials: true
                          },
                          crossDomain: true,
                          data:{
                              name:$("#name").val(),
                              telephone:$("#member").val(),
                              company:$("#company1").val(),
                              email:$("#email1").val()
                          },
                          dataType:'json',
                          success: function(res){
                                console.log(res);
                              if(res.result==1){
                                swiper.slideNext();
                                /* window.location.href = 'www.baidu.com';*/
                              }else{
                                 alert("提交失败");
                              }    
                          },
                          error: function(res) {
                            console.log(res);
                          }
                      })
                    // $.ajax({
                    //     //http://192.168.2.26:8080/zxxt_qyy/widget?type=LuckyActivity&do=in" 黄伟彪本地
                    //     url: "http://wx.cheertea.com/widget?type=LuckyActivity&do=in",
                    //     dataType: 'json',
                    //     type:"post",
                    //     data:$("form").serialize(),
                    //     success : function(res) {
                    //         console.log(res);
                    //         if(res.code == 1){
                    //             window.location.href = "http://wx.cheertea.com/promotional_poster.html?member_id="+ res.data.memberId
                    //         }
                    //     },
                    //     error: function(data) {
                    //         console.log(data)

                    //     }
                    // });
                     alert("您的信息提交成功")
                     /*swiper.slideNext();*/
                } else {
                     alert("请输入正确的11位手机号");
                    // $(".vipmessagebox p").html("请输入正确的11位手机号");
                }
            } else {
                alert("请输入完整信息");
            }
        });


    $('.rootLeft').click(function(){
         swiper.slideNext();
      })
    $('.rootRight').click(function(){
        swiper.slideTo(8,1000);
        })
	function c(x){
		/*if(x==1 || x==20){
			$(".p0 .p0_1").addClass("fadeInDownBig");
			$(".p0 .p0_2").addClass("fadeInUpBig");
			}else{
			$(".p0 .p0_1").removeClass("fadeInDownBig");
			$(".p0 .p0_2").removeClass("fadeInUpBig");
			for(var i=0;i<21;i++){
			var cname=x-1;
			if(x==0 || x==19){cname=18;}
			  if(cname==i){
			  $(".p"+cname+" .p"+cname+"_1").addClass("fadeInRight");
			  $(".p"+cname+" .p"+cname+"_2").addClass("fadeInLeft");
			  }else{
				 $(".p"+i+" .p"+i+"_1").removeClass("fadeInRight");
			     $(".p"+i+" .p"+i+"_2").removeClass("fadeInLeft");  
				  }
			}
				
		}*/
		}
$(".music").click(function(){
        if($(".icon-music").attr("num") == "1"){
            $(".icon-music").removeClass("open");
            $(".icon-music").attr("num","2")
            $(".music-span").css("display","none");
            document.getElementById("aud").pause();
            $(".music_text").html("关闭");
            $(".music_text").addClass("show_hide");
            setTimeout(musicHide,2000);
        }else{
            $(".icon-music").attr("num","1");
            $(".icon-music").addClass("open");
            $(".music-span").css("display","block");
            document.getElementById("aud").play();
            $(".music_text").html("开启");
            $(".music_text").addClass("show_hide");
            setTimeout(musicHide,2000);
        }
        function musicHide(){
            $(".music_text").removeClass("show_hide");
        }

	  });
