;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var numericSpec = require("./function/NumericSpec");
    var islogins = require("./function/isLogin");
    var islogin = islogins.showFocus();

    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.21:8080/zxxt_qyy/";
    }

    var financingPro = {
        numericSpec: function() {
            $(".money").find("span").html(numericSpec.init($(".money").find("span").html()));
        },
        scrollFun: function() {
            var _this = this;
            var viewHeight = $(window).height();
            this.isScroll = true;
            this.ii = 1;
            this.jj = 1;
            this.boolean = true;
            this.booleans = true;

            //滚动下拉加载
            $(window).scroll(function() {
                var pageHeight = $(document.body).height();
                var scrollTop = $(window).scrollTop();
                var aa = (pageHeight - viewHeight - scrollTop) / viewHeight;

                //店铺滚动下拉
                if(_this.boolean) {
                    if(aa <= 0.1 && _this.ii > 1) {
                        _this.boolean = false;
                        _this.appends(_this.ii);
                        _this.getAjax(_this.jj, 10);
                    }
                }
            });
        },
        getAjax: function() {
            var _this = this;

            Ajax({
                urls: "member/getMemberFinanceOrders.action",
                types: "get",
                dataTypes: "json",
                successes: function (data) {
                    console.log(data);

                    //填充DOM
                    $.each(data.res_data.financeOrderList, function(i) {
                        var yearnumber = data.res_data.financeOrderList[i].months + 3;
                        if(data.res_data.financeOrderList[i].months == 12) {
                            yearnumber = 12;
                        }

                        var paymoney =  numericSpec.init(data.res_data.financeOrderList[i].paymoney + "");

                        $(".moneylist").append(
                            "<div class='childli' sn='" + data.res_data.financeOrderList[i].sn + "'>" +
                                "<div class='nameli clearfix'>" +
                                    "<span class='name'>银票宝</span>" +
                                    "<span class='month'>" + data.res_data.financeOrderList[i].months + "个月</span>" +
                                "</div>" +
                                "<div class='otherli clearfix'>" +
                                    "<span class='year'>年化收益率：" +
                                        "<span class='num'>" + yearnumber + ".00%</span>" +
                                    "</span>" +
                                    "<span class='mon'>￥<span class='mons'>" + paymoney + "</span></span>" +
                                "</div>" +
                            "</div>"
                        );
                    });
                }
            });
        },
        getMoneyAjax: function() {
            var _this = this;
            Ajax({
                urls: "getMemberFinancialBalance.action",
                types: "get",
                dataTypes: "json",
                successes: function (data) {
                    console.log(data);
                    $(".money span").html(data.res_data.financial_balance);

                    //转换数字
                    _this.numericSpec();
                }
            });
        },
        init: function() {

            //判断是否登录
            !islogin && (window.location.href = publics + "login.html?forward=member_index.html");


            //数据初始
            this.getAjax();

            //获取ajax
            this.scrollFun();

            //获取金额
            this.getMoneyAjax();
        }
    }
    financingPro.init();
})();