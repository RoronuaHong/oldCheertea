;(function(win, doc) {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var swiperFun = require("./function/swiperFun");
    var getQueryString = require("./function/GetQueryString");
    var imgChange = require("./function/imgchange");
    var imgchange = new imgChange();

    var moonGoodlist = {
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

                    //添加商品
                    $.each(datas.res_data.goodsList, function(i) {
                        $(".wrap-list").append(
                            "<li>" +
                                "<a href=/cn/product_info.html?goods_id=" + datas.res_data.goodsList[i].goods_id + ">" +
                                    "<img src='" + imgchange.show(datas.res_data.goodsList[i].image) + "' alt=''>" +
                                    "<h2>" + datas.res_data.goodsList[i].name +"</h2>" +
                                    "<div>" +
                                        "<p>惊喜价：￥<span>" + datas.res_data.goodsList[i].price +"</span></p>" +
                                        "<p><strong>原价" + datas.res_data.goodsList[i].mktprice + "</strong></p>" +
                                    "</div>" +
                                "</a>" +
                            "</li>"
                        );
                    });
                }
            });
        },
        init: function() {
            //获取ajax
            this.getAjax("goods!getGoodsListByTagId.do", ".speciallist", getQueryString.init("tag_id"), "showSpeshopbox");
        }
    }
    moonGoodlist.init();
})(window, document);
