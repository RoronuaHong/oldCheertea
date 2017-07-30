var $ = require("../common/zepto");
var Ajax = require("./ajax");
var Popup = require("./Popup");

require("../common/fx");
require("../common/fx_methods");

//共用头部
var publics = "http://wx.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.21:8080/zxxt_qyy/";
}

var redPacket = module.exports = {
    addDelete: function() {
        $(".redDelete").css({
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "10000",
            background: "rgba(0, 0, 0, .6)"
        });

        $(".redul").css({
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%"
        });
    },
    deleteBtn: function() {
        $("body").append(
            "<div class='redDelete'>" +
                "<ul class='redul'></ul>" +
            "</div>"
        );

        //添加isDelete背景
        this.addDelete();

        //阻止默认滑动事件
        $(document).on("touchstart", function(event) {

            //阻止页面滑动
            // $("html, body").css({
            //     overflow: "hidden"
            // });

            // event.preventDefault();
        });
    },
    setRedPaketCss: function() {

        //设置红包的css
        $(".redli").css({
            position: "absolute",
            width: "50px",
            height: "80px",
            background: "url(http://images.cheertea.com/redpacket.png?v=100) center center no-repeat",
            backgroundSize: "70%"
        });
    },
    setRedPaket: function() {
        var _this = this;

        //创建style标签
        if($("#styles")) {
            $("head").append(
                "<style id='styles'></style>"
            );
        }

        //设置@keyframes
        var csshtml = "";

        //一次性生成20个红包
        for(var i = 0; i < 20; i++) {
            var xPos = Math.random() * $(document).width() + "px";
            var yPos = -(Math.random() * $(document).width() ) + "px";
            var newPos = (Math.random() * ($(document).width() * 2)).toFixed() % 2 == 1 ? Math.random() * ($(document).width() * 2) + "px" : -(Math.random() * ($(document).width() * 2)) + "px";
            var endPos = 1200 + "px";

            csshtml += "@keyframes alls" + i + " {" +
                                "from {" +
                                    "transform: translate(" + xPos + ", " + yPos + ")" +
                                "}" +
                                "to {" +
                                    "transform: translate(" + newPos + ", " + endPos + ")" +
                                "}" +
                            "}\n";

            $("#styles").html(csshtml);

            $(".redul").append("<li class='redli'></li>");

            $(".redli").eq(i).addClass("redmove");

            $(".redmove").eq(i).css({
                animation: "alls" + i + " " + (Math.random() * 5 + 4) + "s linear infinite"
            });
        }
        _this.setRedPaketCss();
    },
    redBtn: function() {
        var istrue = true;
        $(".redli").on("touchstart", function(event) {
            var _this = this;

            if(!!istrue) {
                istrue = false;
                event.preventDefault();
                $(this).removeClass("redmove");

                Ajax({
                    urls: "activity!snatch.do",
                    types: "get",
                    dataTypes: "json",
                    timeouts: 1000 * 3,
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);

                        //填入结果弹窗
                        if (datas.res_code != 0) {
                            $(".redDelete").append(
                                "<div class='showbox'>" +
                                "<div class='showboxcha'></div>" +
                                "</div>"
                            );
                        }

                        $(".showbox").css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "8.4rem",
                            height: "10.2rem",
                            margin: "auto",
                            background: "url(http://images.cheertea.com/bigredpacket.png?v=100) 0 0 no-repeat",
                            backgroundSize: "contain"
                        });

                        $(".showboxcha").css({
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "1.2rem",
                            height: "1.2rem"
                        });

                        //未登录
                        if (datas.res_code == 0) {
                            Popup("jumper", datas.res_info, publics + "login.html?forward=member_index.html").show();
                        }

                        //抽中
                        if (datas.res_code == 1) {

                            //取消红包雨
                            $(_this).parents(".redul").children().remove();

                            //清除keyframes
                            $("#styles").html("");

                            $(".showbox").append(
                                "<div class='text'>" +
                                "<h3>恭喜您！</h3>" +
                                "<h4 class='showtext'>获得" + datas.res_data.green_point + "个绿积分</h4>>" +
                                "<h5 class='continue'>请到“个人中心-我的积分”里面查看</h5>" +
                                "</div>"
                            );

                            $(".text").css({
                                width: "100%",
                                paddingTop: "1.8rem"
                            });

                            $("h3").css({
                                width: "100%",
                                height: "1rem",
                                lineHeight: "1rem",
                                fontSize: "22px",
                                fontWeight: "bold",
                                textIntent: "1em",
                                textAlign: "center",
                                color: "#ff0000"
                            });

                            $(".showtext").css({
                                width: "100%",
                                height: "1rem",
                                lineHeight: "1rem",
                                fontSize: "22px",
                                textAlign: "center",
                                color: "#ff0000"
                            });

                            $(".continue").css({
                                width: "100%",
                                height: "1rem",
                                marginTop: "-.5rem",
                                paddingTop: "3.5rem",
                                lineHeight: "1rem",
                                fontSize: "14px",
                                textAlign: "center",
                                color: "#fff"
                            });

                            //点击事件
                            $(".showboxcha").on("touchend", function (event) {
                                event.preventDefault();
                                $(".redDelete").remove();

                            });

                        } else {
                            $(".showbox").append(
                                "<div class='text'>" +
                                "<h3>红包没啦！</h3>" +
                                "<h4 class='showtext'>连辣条都买不起了，<br>我讨厌你们~</h4>>" +
                                "<h5 class='continue'>惊喜还在进行，请继续关注！</h5>" +
                                "</div>"
                            );

                            $(".text").css({
                                width: "100%",
                                paddingTop: "2.2rem"
                            });

                            $("h3").css({
                                width: "100%",
                                height: "1rem",
                                lineHeight: "1rem",
                                fontWeight: "bold",
                                textIndent: "1em",
                                fontSize: "34px",
                                textAlign: "center",
                                color: "#ff0000"
                            });

                            $(".showtext").css({
                                width: "100%",
                                height: "1rem",
                                lineHeight: ".8rem",
                                fontSize: "16px",
                                textIndent: "1em",
                                textAlign: "center",
                                color: "#5c5c5c"
                            });

                            $(".continue").css({
                                width: "100%",
                                height: "1rem",
                                marginTop: "-.5rem",
                                paddingTop: "3rem",
                                lineHeight: "1rem",
                                fontSize: "14px",
                                textAlign: "center",
                                textIndent: "1em",
                                color: "#fff"
                            });

                            if(datas.res_code == -3) {

                                //点击事件
                                $(".showboxcha").on("touchend", function (event) {
                                    event.preventDefault();
                                    $(".showbox").remove();

                                    //阻止页面滑动
                                    $("html, body").css({
                                        overflow: "auto"
                                    });
                                });
                            } else {

                                //点击事件
                                $(".showboxcha").on("touchend", function (event) {
                                    event.preventDefault();
                                    $(".redDelete").remove();
                                });
                            }
                        }
                        istrue = true;
                    },
                    error: function(data) {
                        var datas = JSON.parse(data);
                        Popup("alert", datas.res_info);
                    }
                });
            }
        });
    },
    init: function() {
        var _this = this;

        //判断用户能否抽红包
        Ajax({
            urls: "activity!init.do",
            types: "get",
            dataTypes: "json",
            successes: function (data) {
                var datas = JSON.parse(data);
                console.log(datas);

                if(datas.res_code == 1) {
                    if(!datas.res_data.isHasRedPacket && datas.res_data.size > 0) {

                        //删除按钮功能
                        _this.deleteBtn();

                        //设置红包移动
                        _this.setRedPaket();

                        //点击红包事件
                        _this.redBtn();
                    }
                }
            }
        });
    }
}
