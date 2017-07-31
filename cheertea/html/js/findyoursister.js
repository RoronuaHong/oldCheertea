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
                            background: "url(http://images.cheertea.com/findsomething1.png)",
                            "-webkit-overflow-scrolling": "touch"
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

            Ajax({
                urls: "widget?type=find_someting&action=game_begin&member_id=1036",
                types: "POST",
                dataTypes: "json",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    //打乱顺序
                    datas.materials = datas.materials.sort(function() {
                        return 0.5 - Math.random();
                    });

                    //添加需要找的物品
                    $(".needfindimg").attr("src", datas.find[0].material.material_url);
                    $(".needfindimg").attr("ids", datas.find[0].material.material_id);

                    //设置物品的宽度和高度
                    _this.goodWidth = [];
                    _this.goodHeight = [];
                    _this.goodTop = [];
                    _this.goodLeft = [];

                    $(".innerbox").empty();
                    for(var i = 0; i < datas.materials.length; i++) {
                        $(".innerbox").append(
                            "<li></li>"
                        );

                        //设置随机宽高
                        _this.goodWidth[i] = Math.random() * 80 + 50;
                        _this.goodHeight[i] = w * 4 / 5 / 4;

                        //设置位置,如果有重叠则重新设置
                        _this.goodTop[i] = Math.abs(Math.random() * w / 5 * 4 - _this.goodHeight[i]);
                        _this.goodLeft[i] = Math.random() * h * 5 - _this.goodWidth[i];

                        //添加id
                        $(".innerbox li").eq(i).attr("ids", datas.materials[i].material_id);

                        //设置css
                        $(".innerbox li").eq(i).css({
                            float: "left",
                            width: _this.goodWidth[i] / 64 + "rem",
                            height: _this.goodHeight[i] + "px",
                            lineHeight: _this.goodHeight[i] + "px",
                            background: "url(" + datas.materials[i].material_url + ") 0 0 no-repeat",
                            backgroundSize: "contain",
                            fontSize: "24px",
                            textAlign: "center",
                            color: "#00f"
                        });
                    }
                }
            });
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