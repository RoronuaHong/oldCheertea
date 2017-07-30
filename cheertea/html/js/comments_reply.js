var $ = require("./common/zepto");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();

var html = '<div class="name clearfix"> <img src="../tx.png" alt="" /> <span>鸿***头</span> <em>六楼</em> </div> <div class="time"> <p>很好喝哦，快来一起买吧！发货速度也快！</p> <em>2017-05-05 17:40:13</em> </div>' 
$(".detailedreply").append(html);
for(var i=0;i<5;i++){
   $(".name em").eq(i).html(i+1+'楼'); 
}
