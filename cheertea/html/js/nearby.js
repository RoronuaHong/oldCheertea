;(function() {
    var $ = require("./common/zepto");
    var baidumap = require("./function/baiduMap");
    var swiperfun = require("./function/swiperFun");

    require("./common/swiper-3.4.2.min");
    require("./common/touch");

    var nearBy = function() {
        if(this instanceof nearBy) {

        } else {
            return new nearBy();
        }
    }
    nearBy.prototype = {
        init: function() {
            baidumap.init().nearbyOne().searchfun().changeAddress();

            //防止微信黑色背景
            //$("body").on("touchmove", function(event) {
            //    if($(event.target).parents().hasClass("goodlistbox")) {
            //        alert(1);
            //    } else {
            //        event.preventDefault();
            //    }
            //}, false);
        }
    }
    var nearby = new nearBy();
    nearby.init();
})();