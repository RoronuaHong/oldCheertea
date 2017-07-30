;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax.js");
    var getqueryStrings = require("./function/GetQueryString");
    var imgChanges = require("./function/imgchange");
    var thottle = require("./function/thottle");

    var imgchange = new imgChanges();

    var newshopList = {

        /*获取order的值*/
        getOrder: function() {
            var _this = this;

            $(".orderlist li").on("touchend", function() {
                $(".orderlist li span").removeClass("sel");

                $(this).find("span").addClass("sel");

                //修改order的值
                if($(this).index() != 0) {
                    if($(this).find("em").hasClass("emselup")) {
                        $(".orderlist li em").removeClass("emselup");
                        $(".orderlist li em").removeClass("emseldown");
                        $(this).find("em").addClass("emseldown");

                        //判断是否为销量或价格
                        if($(this).index() == 1) {
                            _this.orders = 3;
                        } else {
                            _this.orders = 1;
                        }
                    } else {
                        $(".orderlist li em").removeClass("emselup");
                        $(".orderlist li em").removeClass("emseldown");
                        $(this).find("em").addClass("emselup");

                        //判断是否为销量或价格
                        if($(this).index() == 1) {
                            _this.orders = 4;
                        } else {
                            _this.orders = 2;
                        }
                    }
                } else {
                    $(".orderlist li em").removeClass("emselup");
                    $(".orderlist li em").removeClass("emseldown");
                    _this.orders = 0;
                }
                console.log(_this.orders);

                //填入Ajax
                _this.ii = 1;
                _this.getAjax("getGoodsListByComId.action", getqueryStrings.init("ids"), _this.ii, _this.pageSize, _this.orders, function(data) {
                    console.log(data);
                    if(data.res_code == 1) {

                        //页数更新
                        _this.ii = data.res_data.GoodsList.currentPageNo + 1;

                        $(".newshoplistbox").empty();

                        //获取商品
                        $.each(data.res_data.GoodsList.data, function(i) {
                            $(".newshoplistbox").append(
                                "<dl class='goodsdl'>" +
                                    "<a href='product_info.html?goods_id=" + data.res_data.GoodsList.data[i].goods_id + "'>" +
                                        "<dt>" +
                                            "<img src='" + imgchange.show(data.res_data.GoodsList.data[i].small) + "' alt=''>" +
                                        "</dt>" +
                                        "<dd>" +
                                            "<p class='names'>" + data.res_data.GoodsList.data[i].name + "</p>" +
                                            "<p class='price'>￥<span class='prices'>" + data.res_data.GoodsList.data[i].price + "</span></p>" +
                                        "</dd>" +
                                    "</a>" +
                                "</dl>"
                            );
                        });
                    }
                });
            });
        },
        getAjax: function(urls, ids, pages, pageSizes, order, fn) {
            Ajax({
                urls: urls,
                dataTypes: "json",
                datas: {
                    id: ids,
                    page: pages,
                    pageSize: pageSizes,
                    order: order || 0
                },
                successes: fn
            })
        },
        defaults: function() {
            var _this = this;

            //第一次载入ajax
            this.getAjax("getGoodsListByComId.action", getqueryStrings.init("ids"), this.ii, this.pageSize, this.orders, function(data) {
                console.log(data);
                if(data.res_code == 1) {

                    //页数更新
                    _this.ii = data.res_data.GoodsList.currentPageNo + 1;

                    //获取banner和title
                    $(".header h2").html(data.res_data.company.com_name);
                    $(".newshopbanner img").attr("src", imgchange.show(data.res_data.company.com_banner));

                    $(".newshoplistbox").empty();

                    //获取商品
                    $.each(data.res_data.GoodsList.data, function(i) {
                        $(".newshoplistbox").append(
                            "<dl class='goodsdl'>" +
                                "<a href='product_info.html?goods_id=" + data.res_data.GoodsList.data[i].goods_id + "'>" +
                                    "<dt>" +
                                        "<img src='" + imgchange.show(data.res_data.GoodsList.data[i].small) + "' alt=''>" +
                                    "</dt>" +
                                    "<dd>" +
                                        "<p class='names'>" + data.res_data.GoodsList.data[i].name + "</p>" +
                                        "<p class='price'>￥<span class='prices'>" + data.res_data.GoodsList.data[i].price + "</span></p>" +
                                    "</dd>" +
                                "</a>" +
                            "</dl>"
                        );
                    });

                    console.log(!$(".newshoplistbox").children().hasClass("goodsdl"));

                    //判断是否存在goodsdl
                    !$(".newshoplistbox").children().hasClass("goodsdl") && $(".more").html("暂无商品");
                }
            });
        },
        /*下拉加载*/
        otherAjax: function() {
            var _this = this;

            //判断滚动是否在最底部
            var viewHeight = $(window).height();
            var pageHeight = $(document.body).height();
            var scrollTop = $(window).scrollTop();
            var aa = (pageHeight - viewHeight - scrollTop) / viewHeight;

            if(aa <= 0) {

                //下拉请求ajax
                this.getAjax("getGoodsListByComId.action", getqueryStrings.init("ids"), _this.ii, _this.pageSize, _this.orders, function(data) {
                    console.log(data);
                    if(data.res_code == 1) {

                        //页数更新
                        // _this.ii = data.res_data.GoodsList.currentPageNo + 1;
                        if(_this.ii < data.res_data.GoodsList.totalPageCount) {
                            _this.ii = _this.ii + 1;
                        } else {
                            $(".more").html("没有更多了");
                        }

                        //获取商品
                        $.each(data.res_data.GoodsList.data, function(i) {
                            $(".newshoplistbox").append(
                                "<dl class='goodsdl'>" +
                                "<a href='product_info.html?goods_id=" + data.res_data.GoodsList.data[i].goods_id + "'>" +
                                "<dt>" +
                                "<img src='" + imgchange.show(data.res_data.GoodsList.data[i].small) + "' alt=''>" +
                                "</dt>" +
                                "<dd>" +
                                "<p class='names'>" + data.res_data.GoodsList.data[i].name + "</p>" +
                                "<p class='price'>￥<span class='prices'>" + data.res_data.GoodsList.data[i].price + "</span></p>" +
                                "</dd>" +
                                "</a>" +
                                "</dl>"
                            );
                        });
                    }
                });
            }
        },
        init: function() {
            var _this = this;

            //设置点击的效果元素
            this.orders = 0;

            //设置当前页数
            this.ii = 1;

            //设置显示的数据个数
            this.pageSize = 10;

            //获取order
            this.getOrder();

            //店铺信息初次载入
            this.defaults();

            //实现下拉加载
            window.onscroll = thottle.init(this, function() {
                _this.otherAjax();
            }, 500, 500);
        }
    }
    newshopList.init();
})();
