var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/echo.js");
require("./common/touch");

var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// console.log(imgurl)
  if(window.location.host == "wx.cheertea.com") {
      imgurl = "http://images.cheertea.com/";
      } else if(window.location.host == "test.cheertea.com") {
          imgurl = "http://images.cheertea.com/";
      } else {
          imgurl = "../images/";
  }
var partnerbenefit = function() {
    var _this = this;
    // this.datetime = new datetime();
    // this.swiperfun = new swiperFun();

    if(this instanceof partnerbenefit) {

    } else {
        return new partnerbenefit();
    }
}

partnerbenefit.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
            var getQueryStringByName = function getQueryStringByName(name){
            var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
              if(result == null || result.length < 1){
                  return "";
              }
              return result[1]; 
            }
            var lvId = getQueryStringByName("lvId");
            var memberId = getQueryStringByName("memberId");
            $(".grade").eq(7-lvId).addClass("active").find("img.img01").attr("src","http://images.cheertea.com/pic02.gif");
            $(".grade").eq(7-lvId).find("img.img02").attr("src","http://images.cheertea.com/pic03.gif");
            $(".grade").eq(7-lvId).find("img.img03").attr("src","http://images.cheertea.com/pic04.gif");
            $(".grade").eq(7-lvId).find("img.img04").attr("src","http://images.cheertea.com/pic05.gif");
            $(".grade").eq(7-lvId).find("img.img05").attr("src","http://images.cheertea.com/pic06.gif");
            $(".grade").eq(7-lvId).find("img.img06").attr("src","http://images.cheertea.com/pic07.gif");
            $(".grade .grade-name").on("touchend",function(){
              $(this).siblings(".session").toggle();
            })
            $(".grade").eq(7-lvId).find(".grade-name").prepend("您当前属于");

            $(".share").on("touchend",function(){
                      document.location.href ='/promotional_poster.html?member_id=' + memberId;
                      console.log(memberId);
                  })
        })
        return this;
        
    }
}
var partnerbenefits = new partnerbenefit();
partnerbenefits.init();