var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/touch");
var publics = "http://wx.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.17:8080/zxxt_qyy/";
}
// 切换
$(".nav span").on("tap",function(){
    $(this).addClass('active').siblings().removeClass('active');
});
// 切换评论
var id = 2;
$(".win1").on('touchstart',function(){
   id =2;
   show(id);
});
$(".win2").on('touchstart',function(){
   id =0;
   show(id);
});
$(".win3").on('touchstart',function(){
   id =1;
   show(id);
});
// 奖品专区ajax
show(2);
function show(id){
    $(".big").children().remove();
                $.ajax({
                  url:publics+'shop/activityReward!rewardList.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                          reward_type:id
                          },
                  dataType:'json',
                  success: function(data){ 
                        if(data.res_code==1){
                            var str = data.res_data.reward_list;
                            for(var i=0;i<str.length; i++){
                                var html = '<div class="tab"><div class="news"><img class="pic" src="" alt="" /><div class="more"> <span class="name"></span></div></div></div>'
                                $(".big").append(html);
                                // $(".go").eq(i).attr('href','http://wx.cheertea.com/cn/product_info.html?goods_id='+str[i].goods_id);
                                $(".pic").eq(i).attr('src',imgchange.show(str[i].original));
                                $(".name").eq(i).html(str[i].name);
                            }
                            
                        }                                     
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });

}