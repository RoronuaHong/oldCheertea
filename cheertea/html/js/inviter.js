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

var inviter = function() {
    var _this = this;
    // this.datetime = new datetime();
    // this.swiperfun = new swiperFun();
    if(this instanceof inviter) {

    } else {
        return new inviter();
    }
}

inviter.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
            $(".close02").on("touchend",function(){
              $(".bg").hide();
              $(".beat").hide();
            })

        //     function getAjax(pages,pageSizes,currentParentId){
        //     Ajax({
        //         urls:,
        //         types:"get",
        //         dataTypes:"json",                
        //         beforeSends: function() {
        //               $(".isDelete").show();
        //               $(".loading").show();
        //           },
        //         successes: function(data){

        //         },
        //         completes: function () {
        //             $(".isDelete").hide();
        //             $(".loading").hide();
        //         }
        //       });
        //     };
        //     
        //     
                $.ajax({
                  url:'/shop/getInviters.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){                            
                            if(res.result==1)                      
                            {
                                $(".inviteNum").css({"display" : "block"});
                                $(".bg").css({"display" : "block"});
                                $(".beat").css({"display" : "block"});
                                $(".count").html(res.own_iniviter.count);
                                $(".win").html(res.defeat_percent);
                                $(".pk").html(res.defeat_percent);
                                $(".invit").attr('href','http://wx.cheertea.com/promotional_poster.html?member_id='+res.own_iniviter.member_id);
                            }
                            var str = res.inviter_list;
                                 for(var i = 0; i < str.length; i++){
                                    $(".ranking").eq(i).html(str[i].rank);
                                    $(".pic").eq(i).attr('src',str[i].weixin_face);
                                    $(".ming").eq(i).html(str[i].uname);
                                    $(".number").eq(i).html(str[i].member_id);
                                    $(".invite").eq(i).html(str[i].count);
                                    } 
                            $(".partnerlist").show();  
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });

         });
        return this;
        console.log(1)
    }
}
var inviters = new inviter();
inviters.init();

