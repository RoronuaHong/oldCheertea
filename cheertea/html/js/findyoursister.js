;(function() {
    var $ = require("./common/jquery.min");
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

                        //设置结束游戏的位置
                        $(".gameoverbox").css({
                            display: "none",
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
                            "-webkit-overflow-scrolling": "touch",
                            zIndex: "-1"
                        });

                        //设置滑动块
                        $(".innerbox").css({
                            overflowX: "auto",
                            overflowY: "hidden",
                            width: "500%",
                            height: "100%",
                            "-webkit-overflow-scrolling": "touch",
                            color: "#fff"
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
            var _this = this;

            var i = 4;
            //倒计时进入游戏画面
            _this.timers = setInterval(function() {
                if(i > 0) {
                    $(".clocknum").attr("src", "http://images.cheertea.com/clocknum" + i + ".png");
                } else {
                    $(".startbox").hide();
                    $(".gamebox").show();

                    clearInterval(_this.timers);
                    //开始倒计时
                    $(".countdown .timer").html(_this.times);
                    _this.timer = setInterval(function() {
                        _this.times--;
                        $(".countdown .timer").html(_this.times);

                        if(_this.times < 0) {
                            _this.times = 0;

                            //游戏结束
                            // $(".gamebox").hide();
                            $(".gameoverbox").show();

                            //传递参数给后台
                            Ajax({
                                urls: "widget?type=find_someting&action=game_over",
                                types: "POST",
                                dataTypes: "json",
                                datas: {
                                    find_count: ~~$(".selectNum .num").html()
                                },
                                successes: function(data) {
                                    var datas = JSON.parse(data);
                                    console.log(datas);
                                    clearInterval(_this.timer);

                                    //获取游戏结束的个数
                                    $(".yourfindbox").html($(".selectNum .num").html() + "个");

                                    //判断是否还有游戏机会
                                    $(".continue").on("click", function() {
                                        !!(datas.gameTimes > 0) ? window.location.reload() : (window.location.href = "http://test.cheertea.com/member_index.html");
                                    });
                                }
                            });
                        }
                    }, 1000);
                }

                i--;
            }, 1000);

            $("#startbtn").on("click", function() {
                $(".startbox").hide();
                $(".gamebox").show();

                //开始倒计时
                $(".countdown .timer").html(_this.times);
                _this.timer = setInterval(function() {
                    _this.times--;
                    $(".countdown .timer").html(_this.times);

                    if(_this.times < 0) {
                        _this.times = 0;

                        //游戏结束
                        // $(".gamebox").hide();
                        $(".gameoverbox").show();

                        //传递参数给后台
                        Ajax({
                            urls: "widget?type=find_someting&action=game_ove",
                            types: "POST",
                            dataTypes: "json",
                            datas: {
                                find_count: ~~$(".selectNum .num").html()
                            },
                            successes: function(data) {
                                var datas = JSON.parse(data);
                                console.log(datas);
                                clearInterval(_this.timer);

                                //获取游戏结束的个数
                                $(".yourfindbox").html($(".selectNum .num").html() + "个");

                                //判断是否还有游戏机会
                                $(".continue").on("click", function() {
                                    (datas.gameTimes > 0) ? window.location.reload() : window.location.href = "http://test.cheertea.com/member_index.html";
                                });
                            }
                        });
                    }
                }, 1000);
            });
        },
        /*设置物品的位置*/
        setGoodPos: function(h, w) {
            var _this = this;

            Ajax({
                urls: "widget?type=find_someting&action=game_begin",
                types: "POST",
                dataTypes: "json",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.result == 1) {

                        //打乱顺序
                        datas.materials = datas.materials.sort(function() {
                            return 0.5 - Math.random();
                        });

                        datas.materials = datas.materials.sort(function() {
                            return 0.5 - Math.random();
                        });

                        //添加需要找的物品
                        var findArr = (datas.find[0].material_name);
                        var findIndex = Math.floor(Math.random() * findArr.length);
                        $(".needfindimg").html(findArr[findIndex]);
                        $(".needbox .name").html(findArr[findIndex]);

                        $(".needfindimg").attr("ids", datas.find[0].material_id);

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
                                color: "#00f",
                                "-webkit-click-highlight-color": "transparent"
                            });
                        }

                        $(".innerbox li").on("tap", function(event) {
                            if($(this).attr("ids") === $(".needfindimg").attr("ids")) {

                                //计数器加一次
                                _this.selectedNum++;
                                $(".selectNum .num").html(Math.ceil($(".selectNum .num").html()) + 1);

                                $(".needfindnum strong").html($(".needfindnum strong").html() - 1);

                                //清除当前的li
                                $(this).remove();
                                if($(".needfindnum strong").html() == 0) {

                                    //奖励10秒
                                    _this.times = _this.times + 10;
                                    $(".countdown .timer").html(_this.times);

                                    //发送ajax请求，更新新的数据，并打乱顺序
                                    Ajax({
                                        // widget?type=find_someting&action=game_begin&member_id=1036
                                        urls: "widget?type=find_someting&action=next",
                                        dataTypes: "json",
                                        types: "POST",
                                        datas: {
                                            material_id: $(".needfindimg").attr("ids")
                                        },
                                        successes: function(data) {
                                            console.log(1234)
                                            var datas = JSON.parse(data);
                                            console.log(datas);

                                            //随机添加位置
                                            $(".needfindnum strong").html(3);

                                            for(var i = 0; i < 3; i++) {
                                                var random = Math.ceil(Math.random() * $(".innerbox li").length) - 1;
                                                $(".innerbox li").eq(random).before(
                                                    "<li></li>"
                                                )

                                                //随机描述
                                                var findArrs = (datas.find[0].material_name);
                                                var findIndexs = Math.ceil(Math.random() * findArr.length - 1);

                                                $(".needfindimg").html(findArrs[findIndexs]);
                                                $(".needbox .name").html(findArrs[findIndexs]);

                                                $(".needfindimg").attr("ids", datas.find[0].material_id);

                                                $(".innerbox li").eq(random - 1).attr("ids", datas.materialNew[0].material_id);

                                                $(".innerbox li").eq(random - 1).css({
                                                    float: "left",
                                                    width: (Math.random() * 80 + 50) / 64 + "rem",
                                                    height: (w * 4 / 5 / 4) + "px",
                                                    lineHeight: (w * 4 / 5 / 4) + "px",
                                                    background: "url(" + datas.materialNew[0].material_url + ") 0 0 no-repeat",
                                                    backgroundSize: "contain",
                                                    fontSize: "24px",
                                                    textAlign: "center",
                                                    color: "#00f",
                                                    "-webkit-click-highlight-color": "transparent"
                                                });
                                            }
                                        }
                                    });
                                }
                            } else {
                                _this.times = _this.times - 5;

                                //显示叉叉，并在一秒后消失
                                $(".chacha").fadeIn();
                                $(".chacha").css({
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    margin: "auto",
                                    zIndex: "10"
                                });

                                _this.chacha = setTimeout(function() {
                                    $(".chacha").stop().fadeOut();
                                }, 300);
                            }
                        });
                    }
                    if(datas.result == -1) {
                        window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
                    }
                    if(datas.result == 0) {
                        window.location.href = "http://test.cheertea.com/member_index.html";
                    }
                }
            });
        },
        init: function() {

            //设置选中的次数
            this.selectedNum = 0;

            //设置当前的秒数
            this.times = 60;

            //设置横屏
            this.changeOriention();

            //点击开始游戏
            this.gameStart();
        }
    }
    FindSomething.init();
})();