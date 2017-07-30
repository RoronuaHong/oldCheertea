var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var goodCar = require("./function/goodcar");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
require("./common/echo.js");

require("./common/touch");
var indexFuns = function() {
    var _this = this;
    this.newimgchange = new newimgChange();
    this.swiperfun = new swiperFun();

    if(this instanceof indexFuns) {

    } else {
        return new indexFuns();
    }
}
indexFuns.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
            var datas = {};
            Ajax({
              urls:"widget?type=new_index&ajax=yes&action=getData",
              types:"get",
              dataTypes:"json",
              successes: function(data){
                datas = JSON.parse(data);
                console.log(datas);
                // console.log(datas.advList);
                //鎴戠殑澶哄疂棣栭〉banner
                _this.swiperfun.showBanner(".newimgchangeboxs", datas.advList);
                _this.newimgchange.loadBanner('#newimgchange', 3000, true, 1);

                //鎴戠殑澶哄疂棣栭〉涓鍒楄〃
                _this.swiperfun.newsUp(".i-newslist",datas.czlfgoodsList);
                _this.newimgchange.loadUp('#i-news',3000, true, 1);
                
                //鎴戠殑澶哄疂棣栭〉浜у搧 鍒楄〃 鎺掑簭
                _this.swiperfun.sortTwo(".human-list",datas.deliciousGoodsList);

              },
              error: function(data){
                console.log(data);
              }
            })

            function compare(name, sort){
              // 姝ｅ簭鎺掑垪
              if(sort == 'asc'){
                return function (now, next){
                  if(now[name] > next[name]){
                    return 1;
                  }else if(now[name] == next[name]){
                    return 0;
                  }else if(now[name] < next[name]){
                    return -1;
                  }
                }
              }else{
                return function (now, next){
                  if(now[name] > next[name]){
                    return -1;
                  }else if(now[name] == next[name]){
                    return 0;
                  }else if(now[name] < next[name]){
                    return 1;
                  }
                }
              }
            }

            // 鍊掑簭鎺掑垪
             //鎴戠殑澶哄疂棣栭〉浜у搧 鍒楄〃 鎺掑簭
             $(".human-tab span").on("touchend", function() {
                var type = $(this).attr('data-type');   // 闇�瑕佹帓搴忕殑绫诲瀷
                var sort = $(this).attr('data-sort');   // 涓婁竴娆℃帓搴忕殑瑙勫垯
                $(this).addClass("active").siblings().removeClass("active");
                $(".human-list dl").remove();
                if(type == 1){
                  // 浜烘皵鎺掑簭
                  // 濡傛灉涓婁竴娆℃槸姝ｅ簭锛屽垯鏈鎸夌収鍊掑彊鎺掑垪
                  if(sort == 'asc'){
                    _this.swiperfun.sortTwo(".human-list", datas.deliciousGoodsList.sort(compare('goods_id', 'desc')));
                    $(this).attr('data-sort', 'desc');

                     // console.log(datas.deliciousGoodsList);
                  }else{
                    _this.swiperfun.sortTwo(".human-list", datas.deliciousGoodsList.sort(compare('goods_id', 'asc')));
                    $(this).attr('data-sort', 'asc');
                  
                    // console.log(datas.deliciousGoodsList);
                  }
                }else if(type == 2){
                  // 鏈�鏂�
                }else if(type == 3){
                  // 杩涘害
                }
                Echo.init({
                      offset: 200,
                      throttle: 200
                    });
                })
                $(".human-tab span.last").on("touchend", function() {
                  if($(this).hasClass("active")){
                     $(this).toggleClass("dp");

                    }         
              })


        })
        
        return this;
    }
}

var indexfuns = new indexFuns();
indexfuns.init();
