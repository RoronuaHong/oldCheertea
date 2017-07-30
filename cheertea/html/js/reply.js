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

var product_info = function() {
    var _this = this;
    this.newimgchange = new newimgChange();
    this.swiperfun = new swiperFun();

    if(this instanceof product_info) {

    } else {
        return new product_info();
    }
}
product_info.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
            var datas = {};
            Ajax({
              urls:"type=new_index&ajax=yes&action=getData",
              types:"get",
              dataTypes:"json",
              successes: function(data){
                datas = JSON.parse(data);
                console.log(datas);
                // console.log(datas.advList);
                _this.swiperfun.showBanner(".product-slide", datas.advList);
                _this.newimgchange.loadBanner('#newimgchange', 3000, true, 1);
              },
              error: function(data){
                console.log(data);
              }
            })
        })
        
        return this;
    }
}
var product_infos = new product_info();
product_infos.init();
