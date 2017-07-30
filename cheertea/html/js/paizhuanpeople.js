var $ = require("./common/zepto");
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/touch");
var Popup = require("./function/Popup");
// 拍砖链接
$(".submitt").on('touchstart',function(){
    window.location.href = "feedback.html";
    });