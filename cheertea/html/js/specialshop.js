;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var swiperFun = require("./function/swiperFun");

    var Specialshop = function() {
        this.swiperfun = new swiperFun();
    }
    Specialshop.prototype = {
        constructor: true,

        getAjax: function (urls, boxs, indexs, showbox) {
            var _this = this;
            Ajax({
                urls: urls,
                types: "get",
                dataTypes: "json",
                datas: {
                    tag_id: indexs
                },
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    _this.swiperfun[showbox](boxs, datas.res_data.goodsList);
                }
            });
        },
        GetQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        init: function() {

            //获取商家的联合促销的数据
            this.getAjax("goods!getGoodsListByTagId.do", ".speciallist", this.GetQueryString("tag_id"), "showSpeshopbox");

            if(this.GetQueryString("tag_id") == 69) {
                $(".speimg").attr("src", "http://images.cheertea.com/lovetosalebg.png");
            } else if(this.GetQueryString("tag_id") == 70) {
                $(".speimg").attr("src", "http://images.cheertea.com/specialbanner2.png");
            } else if(this.GetQueryString("tag_id") == 85) {
                $(".speimg").attr("src", "http://images.cheertea.com/specialbanner85.jpg");
                $("h2").html("中秋博饼套装区");
                $("title").html("中秋博饼套装区");
            } else if(this.GetQueryString("tag_id") == 84) {
                $(".speimg").attr("src", "http://images.cheertea.com/specialbanner84.jpg");
                $("h2").html("中秋兑礼区");
                $("title").html("中秋兑礼区");
            } else if(this.GetQueryString("tag_id") == 89) {
                $(".speimg").attr("src", "http://images.cheertea.com/specialbanner89.jpg");
                $("h2").html("安娜妈妈");
                $("title").html("安娜妈妈");
            }
        }
    }

    var specialshop = new Specialshop();
    specialshop.init();
})();