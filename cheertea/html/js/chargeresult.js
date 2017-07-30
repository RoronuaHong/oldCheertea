var $ = require("./common/zepto");

var chargeresult = {
    init: function() {

        //实现页面跳转功能
        var paths = (window.location.href).split("?")[1];
        if(paths) {
            $(".chargefailwrap").show();
            $(".chargesucwrap").hide();
        }
    }
}
chargeresult.init();
