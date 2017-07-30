;(function() {
    var $ = require("./common/jquery.min");
    var Ajax = require("./function/ajax");
    var Popup = require("./function/Popup");
    var numericSpec = require("./function/NumericSpec");
    var getQueryString = require("./function/GetQueryString");

    var yinpiaoTreasure = {
        slide: function() {
            $(".nodetobuy").on("touchend", function() {
                $(this).siblings(".content").slideToggle();
                if($(this).hasClass("nodetobuyup")) {
                    $(this).removeClass("nodetobuyup");
                } else {
                    $(this).addClass("nodetobuyup");
                }
            });
        },
        getAjax: function(num) {
            var _this = this;

            console.log(num);
            Ajax({
                urls: "getFinancingList.action",
                types: "get",
                dataTypes: "json",
                datas: {
                    num: 0,
                    pageSize: 10
                },
                successes: function (data) {
                    console.log(data);
                    _this.sn = data.res_data.financingList.data[num].sn;
                    var minbuy = data.res_data.financingList.data[num].min_buy;
                    var grads = data.res_data.financingList.data[num].grads;
                    var month = data.res_data.financingList.data[num].months;
                    var yearnumber = 3 * num + 6;

                    if($(".moneyinput").val()) {
                        if(($(".moneyinput").val() - minbuy) >= 0) {
                            if(($(".moneyinput").val() - minbuy) % grads == 0) {


                                $(".paywrap").show();
                                $(".yinpiaotreasurewrap").hide();
                                $(".paymentbox li").eq(0).find("span").html("年化收益率：" + yearnumber + "%");
                                $(".paymentbox li").eq(1).html(month + "个月");
                                $(".paymentbox li").eq(2).find("strong").html($(".moneyinput").val());
                            } else {
                                Popup("alert", "请输入梯度的金额(￥ " + grads + ")!").show();
                            }
                        } else {
                            Popup("alert", "金额必须大于" + minbuy + "!").show();
                        }
                    } else {
                        Popup("alert", "请输入金额!").show();
                    }
                }
            });
        },
        selLi: function() {
            $(".yinpiaoul li").on("touchend", function() {
                $(this).addClass("lisel").siblings().removeClass("lisel");
            });
        },
        payFunc: function() {
            var context = this;

            //进入支付页
            $(".buyquickly").on("touchend", function(event) {
                var numi = $(".yinpiaoul .lisel").index();

                //获取银票宝的列表
                context.getAjax(numi);

                /*if($(".moneyinput").val()) {
                    if(($(".moneyinput").val() - getQueryString.init("minbuy")) >= 0) {
                        if(($(".moneyinput").val() - getQueryString.init("minbuy")) % getQueryString.init("grads") == 0) {


                            $(".paywrap").show();
                            $(".yinpiaotreasurewrap").hide();
                            $(".paymentbox li").eq(0).find("span").html("年化收益率：" + getQueryString.init("yearnumber") + "%");
                            $(".paymentbox li").eq(1).html(getQueryString.init("month") + "个月");
                            $(".paymentbox li").eq(2).find("strong").html($(".moneyinput").val());
                        } else {
                            Popup("alert", "请输入梯度的金额!").show();
                        }
                    } else {
                        Popup("alert", "金额必须大于" + getQueryString.init("minbuy") + "!").show();
                    }
                } else {
                    Popup("alert", "请输入金额!").show();
                }*/
            });

            //返回上一页
            $(".newbacks").on("touchend", function(event) {
                event.preventDefault();
                $(".paywrap").hide();
                $(".yinpiaotreasurewrap").show();
            });

            $(".payselect li").on("touchend", function(event) {
                $(this).find("span").addClass("selspan").parent().siblings("li").find("span").removeClass("selspan");
                if($(this).index() == 0) {
                    $(".nextStep").attr("payId", 12);
                } if($(this).index() == 1) {
                    $(".nextStep").attr("payId", 10);
                }
            });
        },
        pay: function() {
            var context = this;

            $(".nextStep").on("touchend", function() {
                Ajax({
                    urls: "member/financingOrder!createFinancingOrder.do",
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        money: $(".moneyinput").val(),
                        paymentId: $(this).attr("payid"),
                        financing_sn: context.sn
                    },
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);

                        if(datas.res_data == -1) {
                            Popup("alert", datas.res_info).show();
                        }

                        //微信支付
                        if($(".nextStep").attr("payId") == 10) {
                            if(datas.res_code == 1) {
                                console.log(222);
                                wx.ready(function() {
                                    wx.chooseWXPay({
                                        appId: datas.res_data.appId,
                                        timestamp: datas.res_data.timeStamp,
                                        nonceStr: datas.res_data.nonceStr,
                                        package: datas.res_data.package,
                                        signType: datas.res_data.signType, // 注意：新版支付接口使用 MD5 加密
                                        paySign: datas.res_data.paySign,
                                        success: function (res) {
                                            console.log(res);
                                            location.href = "payresult.html";
                                        }, cancel: function (res) {
                                            console.log(res);
                                            // location.href="member_pocket.html";
                                        }
                                    });
                                });
                                wx.error(function (res) {
                                    alert(res.errMsg);
                                });
                                wx.config({
                                    debug: false,
                                    appId: datas.res_data.appId,
                                    timestamp: datas.res_data.timeStamp,
                                    nonceStr: datas.res_data.nonceStr,
                                    signature: datas.res_data.paySign,
                                    jsApiList: [
                                        'chooseWXPay'
                                    ]
                                });
                            }
                        }

                        //巨柚支付
                        if($(".nextStep").attr("payId") == 12) {
                            if(datas.res_code == 2) {
                                window.location.href = "payresult.html";
                            } else {
                                window.location.href = "payresult.html?type=1&forward=" + window.location.pathname;
                            }
                        }
                    }
                });
            });
        },
        init: function() {

            //下滑
            this.slide();

            //选择
            this.selLi();

            //选择功能
            this.payFunc();

            //支付
            this.pay();
        }
    }
    yinpiaoTreasure.init();
})();