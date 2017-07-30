;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");

    var FindSomething = {
        changeOriention: function() {
            var _this = this;
            var $wrapbox = $("#wrapbox"),$wrap = $("#wrap");
            function orientationfn() {
                setTimeout(function () {
                    var html = document.documentElement;
                    var w = html.clientWidth, h = html.clientHeight;
                    if (h < w) {//横屏
                        html.style.fontSize = w / 1334 * 100 + "px";
                        $wrap.css({
                            "width": "100%",
                            "webkitTransform": "rotate(0deg)",
                            "transform": "rotate(0deg)",
                            "background": "#ffd0b8"
                        });

                        $wrapbox.css({
                            "width": "auto",
                            "height": "auto"
                        });
                    }
                    else {//竖屏
                        html.style.fontSize = h / 1334 * 100 + "px";
                        $wrap.css({
                            "width": h,
                            "webkitTransform": "rotate(90deg) translate(0, -" + w + "px)",
                            "transform": "rotate(90deg) translate(0, -" + w + "px)"
                        });

                        $wrapbox.css({
                            "width": h,
                            "height": ($wrap.height() - 160)
                        });

                        //设置游戏开始的位置
                        $(".startbox").css({
                            position: "fixed",
                            width: h,
                            height: w,
                            zIndex: 10000
                        });

                        //设置内容区域的宽高
                        $(".gamebox").css({
                            overflowX: "auto",
                            overflowY: "hidden",
                            width: h,
                            height: w / 5 * 4 + "px",
                            marginTop: w / 5 + "px",
                            background: "url(http://images.cheertea.com/findsomething.png)",
                        });

                        //设置物品的位置
                        _this.setGoodPos(h, w);
                    }
                }, 200);
            }
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationfn, false);
            orientationfn();
        },
        /*实现开始游戏*/
        gameStart: function() {
            $("#startbtn").on("click", function() {
                $(".startbox").hide();
                $(".gamebox").show();
            });
        },
        /*设置物品的位置*/
        setGoodPos: function(h, w) {
            var _this = this;

            //设置物品的宽度和高度
            this.goodWidth = [];
            this.goodHeight = [];
            this.goodTop = [];
            this.goodLeft = [];

            $(".innerbox").empty();
            for(var i = 0; i < 180; i++) {
                $(".innerbox").append(
                    "<li>" + i + "</li>"
                );

                //设置随机宽高
                this.goodWidth[i] = Math.random() * 80 + 50;
                this.goodHeight[i] = w * 4 / 5 / 4;

                //设置位置,如果有重叠则重新设置
                this.goodTop[i] = Math.abs(Math.random() * w / 5 * 4 - this.goodHeight[i]);
                this.goodLeft[i] = Math.random() * h * 5 - this.goodWidth[i];

                //设置css
                $(".innerbox li").eq(i).css({
                    float: "left",
                    width: _this.goodWidth[i] / 64 + "rem",
                    height: _this.goodHeight[i] + "px",
                    lineHeight: _this.goodHeight[i] + "px",
                    background: "rgb(" + ~~(Math.random() * 255) + ", " + ~~(Math.random() * 255) + ", " + ~~(Math.random() * 255) + ")",
                    // background: "rgb(11, 111, 11)",
                    backgroundSize: "cover",
                    fontSize: "24px",
                    textAlign: "center",
                    color: "#00f"
                });
            }
        },
        init: function() {

            //设置横屏
            this.changeOriention();

            //点击开始游戏
            this.gameStart();
        }
    }
    FindSomething.init();
})();