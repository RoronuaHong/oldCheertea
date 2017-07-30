var $ = require("./common/zepto");
require("./common/touch");
var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";

// tab切换
$(".tab1").on('touchstart',function(){
    $(".tab2").css({
        background:"url(" + imgurl + "gray.gif) 0 0 no-repeat",
        color:"#060606",
        backgroundSize:"contain"
    });
    $(".tab3").css({background:"url(" + imgurl + "gray.gif) 0 0 no-repeat",
        color:"#060606", backgroundSize:"contain"
    });
    $(".tab1").css({background:"url(" + imgurl + "orange.gif) 0 0 no-repeat",
        color:"#fff3f0",
        backgroundSize:"contain"});
    $(".session").css({"display" : "block"});
    $(".session1").css({"display" : "none"});
    $(".session2").css({"display" : "none"});
});
$(".tab2").on('touchstart',function(){
    $(".tab1").css({
        background:"url(" + imgurl + "gray.gif) 0 0 no-repeat",
        color:"#060606",
        backgroundSize:"contain"
    });
    $(".tab3").css({
        background:"url(" + imgurl + "gray.gif) 0 0 no-repeat",
        color:"#060606",
        backgroundSize:"contain"
    });
    $(".tab2").css({
        background:"url(" + imgurl + "orange.gif) 0 0 no-repeat",
        color:"#fff3f0",
        backgroundSize:"contain"
    });
    $(".session").css({"display" : "none"});
    $(".session1").css({"display" : "block"});
    $(".session2").css({"display" : "none"});
});
$(".tab3").on('touchstart',function(){
    $(".tab1").css({background:"url(" + imgurl + "gray.gif) 0 0 no-repeat",
        color:"#060606",
        backgroundSize:"contain"});
    $(".tab2").css({background:"url(" + imgurl + "gray.gif) 0 0 no-repeat",
        color:"#060606",
        backgroundSize:"contain"});
    $(".tab3").css({background:"url(" + imgurl + "orange.gif) 0 0 no-repeat",
        color:"#fff3f0",
        backgroundSize:"contain"});
    $(".session").css({"display" : "none"});
    $(".session1").css({"display" : "none"});
    $(".session2").css({"display" : "block"});
});
// 点击弹出夺宝号码
$(".look").on('touchstart',function(){
    $(".treasurenumber").show();
});
// 点击退出夺宝号码
$(".dis").on('touchstart',function(){
    $(".treasurenumber").hide();
});
$(".sure").on('touchstart',function(){
    $(".treasurenumber").hide();
});
// 点赞变色
$(".colo").on('touchstart',function(){
    if($(this).attr("src")=="../images/good.gif"){
        $(this).attr('src',"../images/good1.gif");
    }else{
        $(this).attr('src',"../images/good.gif");
    }
});