;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var Popup = require("./function/Popup");
    var islogins = require("./function/isLogin");

    var urlss = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        urlss = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        urlss = "http://test.cheertea.com/";
    } else {
        urlss = "http://192.168.2.21:8080/zxxt_qyy/";
    }

    require("./common/touch");

    var recharge = {
        returnStep: function() {
            $(".step2").on("touchend", function(event) {
                event.preventDefault();
                $(".selectpaywrap").hide();
                $(".rechargewrap").show();
            });
        },
        isValue:  function(mins, pri) {
            var islogin = islogins.showData();

            console.log(islogin)
            //判断用户是否登录
            islogin.res_code == 0 && (window.location.href = "http://wx.cheertea.com/cn/login.html?forward=http://wx.cheertea.com/cn/recharge.html");

            //判断是否有手机号
            console.log(islogin.res_data.member.mobile);
            islogin.res_data.member.mobile == "" && (window.location.href = "http://wx.cheertea.com/cn/bindphone.html?http://wx.cheertea.com/cn/recharge.html");

            //写入警告
            $(".recharinnerbox h3").html("每次至少充值" + mins + "绿积分，且为整数");

            //判断是否有值
            if(!!$(".greeninput").val()) {
                $(".greeninput").addClass("inputcolor");
                $(".priceinput").addClass("inputcolor");
                //根据需求进行联动, 保留2位小数
                $(".priceinput").val(($(".greeninput").val() * pri).toFixed(2));

                //判断是否有值，若有，则显示下一步按钮
                $(".recharnextbtn").addClass("nextcolor");
            } else {
                $(".greeninput").removeClass("inputcolor");
                $(".priceinput").removeClass("inputcolor");
                $(".priceinput").val("");
                $(".recharnextbtn").removeClass("nextcolor");
            }
        },
        greenInputfun: function(mins, pri) {
            var _this = this;
            $(".greeninput").on("input", function() {
                _this.isValue(mins, pri);
            });
        },
        charnextBtn: function(mins) {
            $(".recharnextbtn").on("touchend", function() {

                if($(".recharnextbtn").hasClass("nextcolor")) {

                    //判断绿积分大于100
                    if($(".greeninput").val() >= mins) {

                        //判断是否为整数
                        if(parseInt($(".greeninput").val()) == $(".greeninput").val()) {
                            $(".rechargewrap").hide();
                            $(".selectpaywrap").show();
                        } else {
                            Popup("alert", "绿积分需大于" + mins + "且为整数").show();
                        }
                    } else {
                        Popup("alert", "绿积分需大于" + mins + "且为整数").show();
                    }
                }

                //将金额绑定到支付方式中
                $(".selectpaywrap .price").html($(".rechargewrap .priceinput").val());

            });
        },
        selectPay: function() {
            var _this = this;
            this.indexs = 0;

            $(".payment li").on("touchend", function() {
                $(".payment").find("li").removeClass("lisel");
                $(this).addClass("lisel");

                _this.indexs = $(this).index();
            });
        },
        containPay: function() {
            var _this = this;

            //实现选择付款功能
            this.selectPay();

            $(".containcharge").on("touchend", function() {
                _this.payment = _this.indexs == 0 ? 10 : 12;
                console.log("eq:" + _this.indexs);
                console.log("pay:" + _this.payment);
                Ajax({
                    urls: "member/greenPointDeposit!createGpDepositOrder.do",
                    dataTypes: "json",
                    types: "get",
                    datas: {
                        paymentId: _this.payment,
                        money: $(".rechargewrap .priceinput").val()
                    },
                    successes: function(data) {
                        console.log(data)
                        var datas = JSON.parse(data);
                        console.log(datas)

                        if(datas.res_code == 0) {
                            window.location.href = urlss + "cn/login.html?forward=" + urlss + "cn/recharge.html";
                        }

                        if(datas.res_code == 1) {
                            wx.ready(function () {
                                wx.chooseWXPay({
                                    appId: datas.res_data.appId,
                                    timestamp: datas.res_data.timeStamp,
                                    nonceStr: datas.res_data.nonceStr,
                                    package: datas.res_data.package,
                                    signType: datas.res_data.signType, // 注意：新版支付接口使用 MD5 加密
                                    paySign: datas.res_data.paySign,
                                    success: function (res) {
                                        console.log(res);
                                        location.href = urlss + "cn/chargeresult.html";
                                    }, cancel: function (res) {
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
                                    'chooseWXPay',
                                ]
                            });
                        }

                        //充值成功
                        if(datas.res_code == 2) {
                            location.href = urlss + "cn/chargeresult.html";
                        }

                        //充值失败
                        if(datas.res_code == -1) {
                            location.href = urlss + "cn/chargeresult.html?1";
                        }
                    }
                });
            });
        },
        init: function() {
            var _this = this;
            //获取初始值
            Ajax({
                urls: "greenPointPrice!get.do",
                dataTypes: "json",
                types: "get",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    $(".greeninput").val("");


                    //是否有值
                    _this.isValue(datas.res_data.greenPointPrice.min_purchase, datas.res_data.greenPointPrice.price);
                    //返回
                    _this.returnStep();

                    //绿积分输入
                    _this.greenInputfun(datas.res_data.greenPointPrice.min_purchase, datas.res_data.greenPointPrice.price);

                    //下一步功能
                    _this.charnextBtn(datas.res_data.greenPointPrice.min_purchase);

                    //实现付款功能
                    _this.containPay();
                }
            });
        }
    }
    recharge.init();
})();


