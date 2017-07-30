;(function() {
    var $ = require("./common/zepto");
    var islogins = require("./function/isLogin");
    var commons= new Common();

    //判断用户是否登录
    var islogin = islogins.showFocus();

    var goodsCar = {
        show: function() {
            if(!islogin) {
                $(".goodscarloginwrapnologin").show();
            }
            return this;
        }
    }
    goodsCar.show();
});