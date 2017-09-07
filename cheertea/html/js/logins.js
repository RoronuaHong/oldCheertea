;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax.js");
    require("./common/touch");
    var islogins = require("./function/isLogin");
    var getQueryString = require("./function/GetQueryString");
    var islogin = islogins.showFocus();

    //共用头部
    var publics = "http://wx.cheertea.com/";
    var appId = "wxb4868f50223328db";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
        appId = "wxb4868f50223328db";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
        appId = "wxf3c95148add7878f";
    } else {
        publics = "http://192.168.2.21:8080/zxxt_qyy/";
    }

    if(islogin) {

        if(!!getQueryString.init("forward")) {
            window.location.href = getQueryString.init("forward");
        } else {
            window.location.href = publics + "member_index.html";
        }
    }

    function Login() {
        var _this = this;
        this.userphoneveg = /^1[34578]\d{9}$/gi;
        this.usermailveg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/gi;
        // this.useridcardveg = /^\d{17}[0-9a-z]$/gi;
        this.pwdveg = /^[^\s]{6,16}$/gi;
        this.chinesedeg = /^[\u4e00-\u9fa5\w]{2,20}$/gi;
        this.isTrue = [];

        //判断是否都输入正确

        function AllrightTrue() {
            if (_this.isTrue[0] == 1 && _this.isTrue[1] == 1) {
                $(".loginquickly").addClass("allright");
            } else {
                $(".loginquickly").removeClass("allright");
                $(".loginquickly").removeClass("allright");
            }
        }

        //实现ajax交互功能
        $(".loginquickly").on("touchstart", function() {
            if (_this.isTrue[0] == 1 && _this.isTrue[1] == 1) {
                Ajax({
                    urls: "member/login!login.do?",
                    types: "post",
                    dataTypes: "json",
                    datas: {
                        username: $(".username").val(),
                        password: $(".password").val()
                    },
                    beforeSends: function() {

                    },
                    successes: function(data) {
                        var data = JSON.parse(data);
                        console.log(data);

                        if(data.res_code == 1) {
                            // var urlss = "http://wx.cheertea.com/member_index.html";

                            if(!!getQueryString.init("forward")) {
                                window.location.href = getQueryString.init("forward");
                            } else {
                                window.location.href = publics + "member_index.html";;
                            }
                            //window.location.href = "http://wx.cheertea.com/member_index.html";
                            //window.location.href = "http://192.168.2.24:8080/zxxt_qyy/member_index.html";
                        } else {
                            $(".errormind").show();
                        }
                    },
                    errors: function(data) {
                        console.log(data);
                    }
                });
                // $.ajax({
                //     url: "http://192.168.2.21:8080/zxxt_qyy/widget?type=member_login&ajax=yes&action=ajaxlogin",
                //     type: "post",
                //     dataType: "json",
                //     data: {
                //         username: $(".username").val(),
                //         password: $(".password").val()
                //     },
                //     beforeSend: function(data) {
                //         console.log(1);
                //     },
                //     success: function(data) {
                //         console.log(data);
                //     },
                //     error: function(data) {
                //         console.log(data);
                //     }
                // });
            }
        });

        //判断是否有值
        if ($(".userlogincon input").val()) {
            $(".userlogincon input").siblings("strong").show();
            if ($(".userlogincon input").val().match(_this.userphoneveg) || $(".userlogincon input").val().match(_this.usermailveg) || $(".userlogincon input").val().match(_this.chinesedeg)) {
                $(".userremind").hide();
                _this.isTrue[0] = 1;
            } else {
                $(".userremind").show();
                _this.isTrue[0] = 0;
            }
        } else {
            $(".userlogincon input").siblings("strong").hide();
            _this.isTrue[1] = 0;
        }

        if ($(".userpwdcon input").val()) {
            $(".userpwdcon input").siblings("strong").show();
            if ($(".userpwdcon input").val().match(_this.pwdveg)) {
                $(".pwdremind").hide();
                _this.isTrue[1] = 1;
            } else {
                $(".pwdremind").show();
                _this.isTrue[1] = 0;
            }
        } else {
            $(".userpwdcon input").siblings("strong").hide();
            _this.isTrue[1] = 0;
        }
        new AllrightTrue();

        //输入用户名的功能
        $(".userlogincon input").on("input", function() {
            if ($(this).val()) {
                $(this).siblings("strong").show();
                if ($(this).val().match(_this.userphoneveg) || $(this).val().match(_this.usermailveg) || $(this).val().match(_this.chinesedeg)) {
                    $(".userremind").hide();
                    _this.isTrue[0] = 1;
                } else {
                    $(".userremind").show();
                    _this.isTrue[0] = 0;
                }
            } else {
                $(this).siblings("strong").hide();
                _this.isTrue[1] = 0;
            }
            new AllrightTrue();
        })

        //输入密码功能
        $(".userpwdcon input").on("input", function() {
            if ($(this).val()) {
                $(this).siblings("strong").show();
                if ($(this).val().match(_this.pwdveg)) {
                    $(".pwdremind").hide();
                    _this.isTrue[1] = 1;
                } else {
                    $(".pwdremind").show();
                    _this.isTrue[1] = 0;
                }
            } else {
                $(this).siblings("strong").hide();
                _this.isTrue[1] = 0;
            }
            new AllrightTrue();
        })

        //点击删除清空输入框内容功能
        function ClearInput(mainEle, otherEle) {
            $(mainEle).tap(function() {
                $(this).hide();
                $(this).siblings("input").val("");
                $(otherEle).hide();
                if (mainEle == ".userlogincon strong") {
                    _this.isTrue[0] = 0;
                } else {
                    _this.isTrue[1] = 0;
                }
                new AllrightTrue();
            })
        }

        //用户名输入框清空
        new ClearInput(".userlogincon strong", ".userremind");

        //密码输入框清空
        new ClearInput(".userpwdcon strong", ".pwdremind");

        var states = getQueryString.init("state") ? getQueryString.init("state") : -1;

        //点击跳转
        $(".wechatlogin").on("touchend", function() {
            var string = getQueryString.newInit("forward") || "member_index.html";
            if(isWeiXin()) {
                // appid wxf3c95148add7878f
                window.sessionStorage.setItem("oldurl", getQueryString.newInit("forward"));
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=http%3A%2F%2F' + window.location.host + '%2Fcn%2Fwxlogin.html&response_type=code&scope=snsapi_userinfo&state=' + states + '#wechat_redirect';
            } else {
                // window.location.href = string + '?islogin=no';
                window.location.href = "http://wx.cheertea.com/weixin_login.html?forward=index.html";
            }
        });

        function isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            }else{
                return false;
            }
        }

        // //自动登录
        // if(!!states) {
        //     $(".wechatlogin").trigger("touchend");
        //     $("body").hide();
        // }
    }
    new Login();
})();