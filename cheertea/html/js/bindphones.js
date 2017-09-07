;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var Popup = require("./function/Popup");
    var getQueryString = require("./function/GetQueryString");

    require("./common/touch");

    var bindPhone = {
        full: function() {
            //判断是否填满且密码输入正确
            if($(".phoneinput").val() && $(".veriinput").val()) {
                Ajax({
                    urls: "widget?type=account_security&ajax=yes&action=change_mobile",
                    dataTypes: "json",
                    types: "post",
                    datas: {
                        check_code: $(".veriinput").val(),
                        phone: $(".phoneinput").val()
                    },
                    successes: function(data) {
                        var datas = JSON.parse(data);
                        console.log(datas);
                        if(datas.result == 0) {
                            Popup("alert", datas.message).show();
                        }
                        if(datas.result == 1) {
                            var paths = (window.location.href).split("?")[1];
                            var hrefs = getQueryString.init("forward");
                            $(".containbtn").attr("href", hrefs);
                            Popup("prompt", "手机绑定成功！", paths).show();
                        }
                    }
                });
            } else if(!$(".phoneinput").val()) {
                Popup("alert", "请输入11位手机号").show();
            } else if(!$(".veriinput").val()) {
                Popup("alert", "请输入验证码").show();
            }

        },
        init: function() {
            var _this = this;

            //手机正则
            var phoneVeg = /^1[34578]\d{9}$/;
            var timer = 0;
            var isClick = true;

            //点击获取验证码
            $(".getveri").on("touchend", function() {
                var __this = $(this);
                var times = 60;

                if(phoneVeg.test($(".phoneinput").val())) {
                    if(isClick) {
                        isClick = false;
                        Ajax({
                            urls: "widget?type=account_security&ajax=yes&action=sendMessage",
                            dataTypes: "json",
                            types: "post",
                            datas: {
                                phone: $(".phoneinput").val()
                            },
                            successes: function(data) {
                                console.log(data);
                                var datas = JSON.parse(data);

                                if(datas.result == 1) {
                                    Popup("alert", datas.message).show();

                                    //实现倒计时功能，并且按钮不能再次点击
                                    timer = setInterval(function() {
                                        times--;
                                        if(times > 0) {
                                            __this.html("重新验证(" + times + ")");

                                        } else {
                                            __this.html("重新验证");
                                            clearInterval(timer);
                                            isClick = true;
                                        }
                                    }, 1000);
                                }
                            }
                        });
                    }
                } else {
                    Popup("alert", "请输入正确的11位手机号").show();
                    isClick = true;
                }
            });

            //点击确定绑定手机
            $(".containbtns").on("touchend", function() {
                _this.full();
            });
        }
    }

    bindPhone.init();
})();

