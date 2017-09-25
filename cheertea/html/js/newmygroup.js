;(function(win, doc) {
    var $ = require("./common/zepto");
    var newimgChange = require('./function/newimgchange');
    var Ajax = require("./function/ajax");
    var swiperFun = require("./function/swiperFun");
    var swiperfun = new swiperFun();
    var newimgchange = new newimgChange();

    var islogins = require("./function/isLogin");
    var imgChange = require("./function/imgchange");
    var imgchange = new imgChange();

    var getQueryString = require("./function/getQueryString");
    var timestampUtil = require("./function/TimestampUtil");

    if(window.location.host == "wx.cheertea.com") {
        imgurl = "http://images.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        imgurl = "http://images.cheertea.com/";
    } else {
        imgurl = "../images/";
    }

    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.21:8080/zxxt_qyy/";
    }

    var newMyGroup = {
        /*判断是否登录*/
        isLogin: function() {
            var islogin = islogins.showFocus();
            !islogin && (window.location.href = publics + "cn/login.html?forward=" + window.location.pathname + window.location.search);
        },
        getMyGroupAjax: function() {
            var _this = this;

            Ajax({
                urls: "myTogetherBuyList.action",
                dataTypes: "json",
                types: "get",
                successes: function(data) {
                    console.log(data);

                    //判断拼团状态
                    $.each(data.res_data.memberTogetherBuyList, function(i) {
                        _this.allArr.push(data.res_data.memberTogetherBuyList[i]);

                        if (data.res_data.memberTogetherBuyList[i].remaintime > 0) {
                            if (data.res_data.memberTogetherBuyList[i].remain <= 0) {
                                _this.successArr.push(data.res_data.memberTogetherBuyList[i]);
                            } else {
                                _this.continueArr.push(data.res_data.memberTogetherBuyList[i]);
                            }
                        } else {
                            if (data.res_data.memberTogetherBuyList[i].remain <= 0) {
                                _this.successArr.push(data.res_data.memberTogetherBuyList[i]);
                            } else {
                                _this.failArr.push(data.res_data.memberTogetherBuyList[i]);
                            }
                        }
                    });

                    //操作DOM
                    _this.appendTabbox(data, _this.allArr);

                    //实现tab切换
                    _this.tabChanges(data);
                }
            });
        },
        tabChanges: function(data) {
            var _this = this;

            $(".tablist li").on("touchend", function() {
                $(this).addClass("sels").siblings().removeClass("sels");
                if($(this).index() == 0) {
                    _this.appendTabbox(data, _this.allArr);
                } else if($(this).index() == 1) {
                    _this.appendTabbox(data, _this.continueArr);
                } else if($(this).index() == 2) {
                    _this.appendTabbox(data, _this.successArr);
                } else {
                    _this.appendTabbox(data, _this.failArr);
                }
            });
        },
        appendTabbox: function(data, arr) {
            console.log(arr)
            //清空DOM
            $(".tabbox").empty();
            var imgs = 'http://images.cheertea.com/logobgs.png';

            $.each(arr, function(i) {
                !!(arr[i].image) && (imgs = imgchange.show(arr[i].image));
                $(".tabbox").append(
                    '<div class="tabchildbox">' +
                        '<div class="bigbox clearfix">' +
                            '<img src="' + imgs + '" alt="" class="bigboximg">' +
                            '<div class="rightcontentbox">' +
                                '<p class="text">' + arr[i].title + '</p>' +
                                '<div class="groupmeta clearfix"><span>' + arr[i].total + '</span>人团</div>' +
                                    '<div class="pricebox clearfix">' +
                                        '<span class="totalpri">' +
                                            '总计: ￥<span class="pri">' + arr[i].order.paymoney + '</span>' +
                                        '</span>' +
                                        '<div class="theResultbox">' +
                                            '<div class="success clearfix">' +
                                                '<span class="suc">√</span>' +
                                                '<span class="suctext">拼团成功</span>' +
                                            '</div>' +
                                            '<div class="fail clearfix">' +
                                                '<span class="fai">×</span>' +
                                                '<span class="faitext">拼团失败</span>' +
                                            '</div>' +
                                            '<div class="continue clearfix">' +
                                                '<span class="suc">...</span>' +
                                                '<span class="tunuetext">拼团中</span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="detailbox clearfix">' +
                                '<div class="dettime">' +
                                    '<span class="year">' + timestampUtil.getAll({ times: arr[i].create_time }) + '</span>' +
                                '</div>' +
                                '<div class="othertail clearfix">' +
                                    '<a href="/cn/groupdetail.html?groupId=' + arr[i].create_id + '" class="grouptail">拼团详情</a>' +
                                    '<a href="' + publics + 'member_orderdetail_' + arr[i].ordersn + '.html" class="ordertail">订单详情</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );

                //判断拼团状态
                if(arr[i].remaintime > 0) {
                    if(arr[i].remain <= 0) {
                        $(".tabchildbox").eq(i).find(".theResultbox .success").show();
                        $(".tabchildbox").eq(i).find(".theResultbox .fail").hide();
                        $(".tabchildbox").eq(i).find(".theResultbox .continue").hide();
                    } else {
                        $(".tabchildbox").eq(i).find(".theResultbox .success").hide();
                        $(".tabchildbox").eq(i).find(".theResultbox .fail").hide();
                        $(".tabchildbox").eq(i).find(".theResultbox .continue").show();
                    }
                } else {
                    if(arr[i].remain <= 0) {
                        $(".tabchildbox").eq(i).find(".theResultbox .success").show();
                        $(".tabchildbox").eq(i).find(".theResultbox .fail").hide();
                        $(".tabchildbox").eq(i).find(".theResultbox .continue").hide();
                    } else {
                        $(".tabchildbox").eq(i).find(".theResultbox .success").hide();
                        $(".tabchildbox").eq(i).find(".theResultbox .fail").show();
                        $(".tabchildbox").eq(i).find(".theResultbox .continue").hide();
                    }
                }
            });
        },
        init: function() {

            //将数据分类
            this.continueArr = [],
            this.successArr = [],
            this.failArr = [],
            this.allArr = [];

            //判断登录
            this.isLogin();

            //获取ajax的值
            this.getMyGroupAjax();
        }
    }
    newMyGroup.init();
})(window, document);
