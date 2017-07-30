// var $ = require("./common/zepto");
var $ = require("./common/jquery.min");
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
          imgurl = "/images/";
  }
var group_activity = function() {
    var _this = this;
    // this.newimgchange = new newimgChange();
    // this.swiperfun = new swiperFun();

    if(this instanceof group_activity) {

    } else {
        return new group_activity();
    }
}

 

group_activity.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
            $("#create_group").on("touchstart", function() {

              var member_id = $("#member_id").val();
              $.ajax({
                url:"http://wx.cheertea.com/widget?type=groupactivity_index&action=creategroup&ajax=yes",
                type: "get",
                data: {member_id:member_id},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:"json",
                success:function(data){
                  if(data.result == 1){//已关注公众号，已绑定手机号
                    window.location.href="http://wx.cheertea.com/group_activity.html";
                  } else if(data.result == 2){//未绑定手机号
                    window.location.href="http://wx.cheertea.com/create_group.html?&member_id=" + member_id;
                  } else if(data.result == 3){//未关注公众号//显示二维码
                    $(".erweimabox").show();
                    $(".baituandazhanwrap").hide();
                  }
                },
               error:function(e){
                   alert("失败！");
                 console.log(e);
               }
              });
            });

          // 金币下落
          var win = (parseInt($(".couten").css("width")));
          console.log(win);
          $(".couten").css("height", $(".groud").height());
          // $(".backward").css("height", $(document).height());
          $("li").css({});
          var del = function(){
            nums++;
            $(".li" + nums).remove();
            setTimeout(del,200)
          }
          
          var add = function() {
            var Wh = parseInt(Math.random() * (80 - 40) + 20);
            var Left = parseInt(Math.random() * win);
            var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";
            var Left02 = parseInt(Math.random() * win)*6.4;
            num++;
            // $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src='/images/rmb.png'></a></li>");
            $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src=" + imgurl + "rmb.png" + " alt=''></a></li>");
            $(".li" + num).css({
              "left": Left*6.4,
            });
            $(".li" + num + " a img").css({
              "width": Wh,
              "transform": "rotate(" + rot + ")",
              "-webkit-transform": "rotate(" + rot + ")",
              "-ms-transform": "rotate(" + rot + ")", /* Internet Explorer */
              "-moz-transform": "rotate(" + rot + ")", /* Firefox */
              "-webkit-transform": "rotate(" + rot + ")",/* Safari 和 Chrome */
              "-o-transform": "rotate(" + rot + ")" /* Opera */
            }); 
            $(".li" + num).animate({
                'top':$(".groud").height()+20,
                'left':Left02
                  },5000,function(){
              //删掉已经显示的红包
              this.remove()
            });
            //点击红包的时候弹出模态层
            // $(".li" + num).click(function(){
            //   $(".mo").css("display", "block")
            // });
            setTimeout(add,200)
          } 
          
          //增加红包
          var num = 0;
          add();
          
          //倒数计时
          // var backward = function(){
          //   numz--;
          //   if(numz>0){
          //     $(".backward span").html(numz);
          //   }else{
          //     $(".backward").remove();
          //   }
          //   setTimeout(backward,1000)
                
          // }
          
          // var numz = 4;
          // backward();
      
          
              
  
            // Ajax({
            //   urls:"http://wx.cheertea.com/widget?type=new_index&ajax=yes&action=getData",
            //   types:"get",
            //   dataTypes:"json",
            //   successes: function(data){
            //     datas = JSON.parse(data);
            //     console.log(datas);
            //     console.log(datas.advList);
            //     _this.swiperfun.showBanner(".product-slide", datas.advList);
            //     _this.newimgchange.loadBanner('#newimgchange', 3000, true, 1);
            //   },
            //   error: function(data){
            //     console.log(data);
            //   }
            // })
        })
        
        return this;
    }
}
var group_activitys = new group_activity();
group_activitys.init();
