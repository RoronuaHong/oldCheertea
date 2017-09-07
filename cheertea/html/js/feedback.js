var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/touch");
var Popup = require("./function/Popup");
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.29:8888/zxxt_qyy/";
}
// 判断有没有登陆
                $.ajax({
                  url:'http://wx.cheertea.com/member/login!isLogin.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                          },
                  dataType:'json',
                  success: function(data){   
                            console.log(data); 
                            if(data.res_code==0){
                            window.location.href = "/cn/login.html?forward=" + window.location.pathname + window.location.search;
                        }                        
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });
// 输入框字数限制

$(".content").bind('input propertychange',function(){ 
var txtLeng = $(this).val().length;      
if( txtLeng>100){  
    Popup("alert", "内容不得多于100字！").show();
}
  });
// 拍砖达人链接
$(".middle p").on('touchstart',function(){
    window.location.href = "paizhuanpeople.html";
    });
// 提交用户评价ajax
$(".submitt").on('touchstart',function(){
    var input2 = $(".content").val();
    var input1 = $(".content").val().length;
          if(input1<10){
            Popup("alert", "内容不得少于10个字！").show();
          }else{
                $.ajax({
                  url:publics+'shop/activityZhaoCha!submitSuggest.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                           content:input2, 
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                            Popup("jumper", "提交成功,感谢您的建议！","http://wx.cheertea.com/member_index.html").show();     
                        // }else if(data.res_code==0){
                        //     window.location.href = "http://wx.cheertea.com/login.html?forward=" + window.location.pathname + window.location.search;
                        }else if(data.res_code==-1){
                            Popup("alert", "您已经提交过,不能再次提交！").show();
                        }                                    
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });
                }
    });
