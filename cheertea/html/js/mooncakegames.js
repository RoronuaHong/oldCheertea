;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var islogins = require("./function/isLogin");
    var islogin = islogins.showFocus();

    //共用头部
    var publicss = "http://images.cheertea.com/";
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.24:3000/";
    }

    if(!islogin) {
        window.location.href = publics + "cn/login.html?forward=" + document.URL;
    }

    var mooncakeGame = {
        shareWx: function() {
            var url = "http://wx.cheertea.com/cn/mooncakebetting.html";
            // var url = location.href;

            var member_id = 7077;
            var image_url = "http://wx.cheertea.com/statics/images/default/lucky.png";
            if(member_id != "" && member_id != undefined && member_id != null){
                var shareUrl = 'http://wx.cheertea.com/cn/mooncakebetting.html';
                $.ajax({
                    type:'POST',
                    url:'http://wx.cheertea.com/widget?type=group_activity&action=ajaxsign&ajax=yes',
                    data:{url:url, member_id:member_id},
                    dataType:"json",
                    success: function(data){
                        wx.config({
                            debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId : data.appid, // 必填，公众号的唯一标识
                            timestamp : data.timestamp, // 必填，生成签名的时间戳
                            nonceStr :  data.nonceStr, // 必填，生成签名的随机串
                            signature : data.signature,// 必填，签名，见附录1
                            jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
                                'onMenuShareAppMessage', 'onMenuShareQQ',
                                'onMenuShareQZone' ]
                            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function(){
                            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareTimeline({
                                title: " 巨柚博饼，大礼送不停   ", // 分享标题
                                link: shareUrl,
                                imgUrl: image_url , // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareAppMessage({
                                title: " 巨柚博饼，大礼送不停   ", // 分享标题
                                desc: "云海深处，月影难觅。万家灯火，天涯此时。", // 分享描述
                                link: shareUrl ,
                                imgUrl: image_url, // 分享图标
                                type: data.type, // 分享类型,music、video或link，不填默认为link
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });

                            //获取“分享到QQ”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareQQ({
                                title: " 巨柚博饼，大礼送不停   ", // 分享标题
                                title: "云海深处，月影难觅。万家灯火，天涯此时。", // 分享描述
                                link: shareUrl, // 分享链接
                                imgUrl: image_url, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });

                            //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareQZone({
                                title: " 巨柚博饼，大礼送不停   ", // 分享标题
                                title: "云海深处，月影难觅。万家灯火，天涯此时。", // 分享描述
                                link: shareUrl, // 分享链接
                                imgUrl: image_url, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        });
                        wx.error(function(res){
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                            alert("error");
                        });
                    },
                    error: function(){
                        alert("出现错误，连接未成功");
                    }
                })
            }
        },
        diceBoxTop: function() {
            $(".dicebox").css({
                height: $(".mooncakegameswrap").height() / 3.5 + "px",
                top: $(".mooncakegameswrap").height() / 3 + "px"
            });
        },
        isTouched: function() {
            var timer = 0;
            var dicestimer = 0;
            var timerbox = 0;
            var dicesArr = [];

            if($(".gesturebox").position().top > $(".dicebox").position().top && $(".gesturebox").position().top < ($(".dicebox").position().top + $(".dicebox").height() / 2)) {
                if($(".gesturebox").position().left > ($(".dicebox").position().left - $(".dicebox").width() / 2) && $(".gesturebox").position().left < ($(".dicebox").position().left + $(".dicebox").width() / 2)) {

                    //手势变化，隐藏骰子
                    $(".gesturebox").addClass("gestureclose");
                    $(".dicebox").addClass("diceboxopacity");
                    $("#isDeletes").show();

                   //手指离开屏幕
                    $(".mooncakegameswrap").off("touchend").on("touchend", function(event) {
                        event.preventDefault();
                        $("#isDeletes").show();
                        Ajax({
                            urls: "shop/bettingCake.do",
                            dataTypes: "json",
                            successes: function (data) {
                                var datas = JSON.parse(data);
                                console.log(datas);

                                if (datas.res_code == 1) {
                                    $(".dicebox").removeClass("diceboxopacity");
                                    //改变手势
                                    $(".gesturebox").removeClass("gestureclose");
                                    $(".gesturebox").addClass("gestureshow");

                                    //设置一段时间手势消失
                                    clearTimeout(timer);
                                    timer = setTimeout(function() {
                                        $(".gesturebox").hide();
                                        $(".gesturebox").removeClass("gestureclose");
                                        $(".gesturebox").removeClass("gestureshow");
                                    }, 500);

                                    //创建style标签
                                    if($("#styles")) {
                                        $("head").append(
                                            "<style id='styles'></style>"
                                        );
                                    }
                                    var csshtml = "";

                                    //显示骰子
                                    $.each($(".dicebox li"), function(i) {

                                        //乱序
                                        var oldTop = $(".dicebox li").eq(i).position().top;
                                        var oldLeft = $(".dicebox li").eq(i).position().left;
                                        csshtml += "@keyframes alls" + i + " {" +
                                            "0% {" +
                                            "top: " + oldTop + "px;" +
                                            "left: " + oldLeft + "px;" +
                                            "}" +
                                            "20% {" +
                                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 1) + "px;" +
                                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 1) + "px;" +
                                            "}" +
                                            "40% {" +
                                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 1) + "px;" +
                                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 1) + "px;" +
                                            "}" +
                                            "60% {" +
                                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 1) + "px;" +
                                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 1) + "px;" +
                                            "}" +
                                            "80% {" +
                                            "top: " + ~~(Math.random() * $(".dicebox").height() / 3 * 2 + 1) + "px;" +
                                            "left: " + ~~(Math.random() * $(".dicebox").width() / 3 * 2 + 1) + "px;" +
                                            "}" +
                                            "100% {" +
                                            "top: " + oldTop + "px;" +
                                            "left: " + oldLeft + "px;" +
                                            "}" +
                                            "}\n";

                                        $("#styles").html(csshtml);

                                        //变换图片
                                        $(".dicebox li").eq(i).css({
                                            background: "url(" + publicss +"1.gif) 0 0 no-repeat !important",
                                            backgroundSize: "100% 100% !important",
                                            animation: "alls" + i + " 0.8s linear infinite"
                                        });
                                    });
                                    $(".dicebox").removeClass("diceboxopac.ity");

                                    //骰子结束
                                    clearTimeout(dicestimer);
                                    dicestimer = setTimeout(function() {

                                        /*//骰子运动停止
                                        $.each($(".dicebox li"), function() {
                                            dicesArr.push(~~(Math.random() * 6 + 1));
                                        });*/
                                        datas.res_data.touzi_value.shift();
                                        dicesArr = datas.res_data.touzi_value;

                                        $(".dicebox").children().hide();
                                        $.each(dicesArr, function(i) {

                                            //变换图片
                                            $(".dicebox li").eq(i).css({
                                                background: "url(" + publicss + dicesArr[i] + ".png) 0 0 no-repeat !important",
                                                backgroundSize: "100% 100% !important",
                                                animation: "none"
                                            });
                                        });
                                        $(".dicebox").children().show();
                                        console.log(dicesArr);

                                        //显示开始游戏
                                        $(".gamestartbetting").show();
                                        /*$("#isDeletes").hide();*/

                                        clearTimeout(timerbox);
                                        timerbox = setTimeout(function() {
                                            //显示弹窗
                                            $("#isDeletes").hide();
                                            $(".changemessage span").html(datas.res_data.all_count);
                                            if(datas.res_data.all_count > 0) {
                                                $("#showDelete").show();
                                                $("#continue").show();
                                                $("#earnchance").hide();
                                            } else {
                                                $("#showDelete").show();
                                                $("#continue").hide();
                                                $("#earnchance").show();
                                            }

                                            if(datas.res_data.iswin == 1) {
                                                $(".showMessagebox").addClass("winningbg");
                                                $(".iswinmessage").find("span").html(datas.res_data.reward_result);
                                                $(".iswinmessage").show();
                                            } else {
                                                $(".showMessagebox").removeClass("winningbg");
                                                $(".iswinmessage").hide();
                                            }
                                        }, 1000);
                                    }, 1500);
                                }

                                if (datas.res_code == -1) {
                                    window.location.href = "./mooncakebetting.html"
                                }
                            }
                        });
                    });
                }
            } else {
                $(".dicebox").removeClass("diceboxopacity");
                !$(".dicebox").hasClass("diceboxopacity") && $(".gesturebox").removeClass("gestureclose");

                $(".mooncakegameswrap").off("touchend").on("touchend", function(event) {
                    event.preventDefault();
                    $(".gesturebox").hide();
                    $("#isDeletes").hide();

                    //显示开始游戏
                    $(".gamestartbetting").show();
                });
            }
        },
        buttonFun: function() {

            //按钮功能
            $("#continue").on("tap", function(event) {
                event.preventDefault();
                $("#showDelete").hide();
                $("#isDeletes").hide();
            });

            $("#earnchance").attr("href", "mooncakebetting.html?earn=1");
        },
        moveHand: function() {
            var _this = this;

            //手指碰触屏幕时
            $(".mooncakegameswrap").on("touchstart", function(event) {
                if($(event.target).hasClass("gamestartbetting")) {
                    $(event.target).hide();
                    $(".gesturebox").show();
                    _this.isTouched();

                    $("head").find("#styles").remove();
                }
                event.preventDefault();

                //改变手势位置
                $(".gesturebox").css({
                    top: event.touches[0].clientY - $(".gesturebox").height() / 2 + "px",
                    left: event.touches[0].clientX - $(".gesturebox").width() / 2 + "px"
                });
            });

            //手指在屏幕上移动
            $(".mooncakegameswrap").on("touchmove", function(event) {
                event.preventDefault();

                //改变手势位置
                $(".gesturebox").css({
                    top: event.touches[0].clientY - $(".gesturebox").height() / 2 + "px",
                    left: event.touches[0].clientX - $(".gesturebox").width() / 2 + "px"
                });

                //判断手势是否在碗中
                _this.isTouched();
            });
        },
        init: function() {

            //微信分享
            // this.shareWx();

            //设置骰子位置
            this.diceBoxTop();

            //移动手势
            this.moveHand();

            //按钮功能
            this.buttonFun();
        }
    }

    mooncakeGame.init();
})();
