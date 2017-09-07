var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/touch");
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.29:8888/zxxt_qyy/";
}
var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// 兑奖方式链接
$(".top span").on('touchstart',function(){
    window.location.href = "duijiangway.html";
    });
// 我的中奖ajax
            $.ajax({
                  url:publics + 'widget?type=find_someting&action=my_award',
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
                        if(data.result==1){
                            var str = data.myAwardList;
                            for(var i=0;i<str.length;i++){
                                var html ='<div class="news clearfix"><span class="game">大家来找茬</span> <span class="time">2017-09-10</span> <img class="picture" src="../int_03.png" alt="" /> <span class="winning">月月奖</span> <a class="more" href=""><img class="go" src="../mywin_05.png" alt="" /></a></div>' 
                                 // 时间13位转换
                                function getLocalTime1(nS) {      
                                 return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
                                                          }  
                                var time = (getLocalTime1(str[i].add_time).substring(0,9));
                                $(".mywinningprizewrap").append(html);
                                $(".game").eq(i).html(str[i].plate);
                                $(".time").eq(i).html(time);
                                $(".winning").eq(i).html(str[i].award_item);
                                $(".more").eq(i).attr('href','http://wx.cheertea.com/cn/product_info.html?goods_id='+str[i].goods_id+"&"+"state="+str[i].state);
                                if(str[i].state==0){
                                    $(".picture").eq(i).attr('src',"../int_03.png");
                                }else if(str[i].state==1){
                                    $(".picture").eq(i).attr('src',"../int_06.png");
                                }
                            }
                        }                               
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });