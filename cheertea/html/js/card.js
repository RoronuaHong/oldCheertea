var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
var islogins = require("./function/isLogin");

require("./common/echo.js");
require("./common/touch");

var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// console.log(imgurl)

if(!islogins.showFocus()) {
    window.location.href = "login.html?forward=" + window.location.pathname;
}

var card = function() {
    var _this = this;
    // this.newimgchange = new newimgChange();
    // this.swiperfun = new swiperFun();

    if(this instanceof card) {

    } else {
        return new card();
    }
}
card.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
          var prize = 0;
            $(".card-list li").on("tap",function(){
              $(this).addClass("active").siblings("li").removeClass("active");
                prize = $(this).attr("data-money");
            });
             $(".chongzhibtn.hasbtn").on("tap",function(){

                 if(prize==0){
                     alert("请选择您要购买的充值卡")
                 }else{
                     var cardType = 1;
                     if(prize==1000){
                         cardType = 1;
                     }else if(prize==2000){
                         cardType = 2;
                     }else if(prize==5000){
                         cardType =3;
                     }
                     document.location.href ='http://wx.cheertea.com/advance_charge.html?cardType=' + cardType;
                 }
             })
             
        })
        return this;
    }
}
var cards = new card();
cards.init();
