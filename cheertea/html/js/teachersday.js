;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var getquerystring = require("./function/getQueryString");
    var imgChange = require("./function/imgchange");
    var imgchange = new imgChange();

    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }

    var Teachersday = {
        /*实现分享功能*/
        shareWx: function(ids) {
            var url = location.href;
            var member_id = ids;
            var image_url = "http://images.cheertea.com/logonews.png";
            if(member_id != "" && member_id != undefined && member_id != null){
                var shareUrl = 'http://wx.cheertea.com/cn/mooncakebetting.html?memberid=' + member_id;
                $.ajax({
                    type:'POST',
                    url:'http://wx.cheertea.com/widget?type=group_activity&action=ajaxsign&ajax=yes',
                    data:{url:url, member_id:member_id},
                    dataType:"json",
                    success: function(data) {
                        wx.config({
                            debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
                                title: " 巨柚博饼，大礼送不停", // 分享标题
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
        /*判断是否登录*/
        isLogin: function() {
            var _this = this;

            //判断用户是否登录
            Ajax({
                urls: "member/login!isLogin.do",
                types: "get",
                asyncs: false,
                // timeouts: 1000 * 10,
                dataTypes: "json",
                successes: function (data) {
                    var datas = JSON.parse(data);

                    if(datas.res_code == 0) {
                        var parentId = getquerystring.init("memberid");
                        if(!!parentId) {
                            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb4868f50223328db&redirect_uri=http%3A%2F%2Fwx.cheertea.com%2Fmember_index.html"
                                +"&response_type=code"
                                +"&scope=snsapi_userinfo"
                                +"&state="+parentId+"#wechat_redirect";

                            window.location.href = url;
                        } else {
                            window.location.href = "/cn/login.html?forward=" + window.location.pathname;
                        }
                    }
                    if(datas.res_code == 1) {
                        //微信分享
                        _this.shareWx(datas.res_data.member.member_id);
                    }
                }
            });
        },
        /*实现tab切换*/
        showRuleTab: function() {
            $(".tabul li").on("touchend", function() {
                $(this).addClass("lisel").siblings(".tabul li").removeClass("lisel");
                $(".conul .cons").eq($(this).index()).addClass("showcons").siblings(".cons").removeClass("showcons");

                //获取邀请数据
                if($(this).index() == 2) {
                    console.log(1);
                    // Ajax({
                    //     urls: "member/login!isLogin.do",
                    //     types: "get",
                    //     asyncs: false,
                    //     // timeouts: 1000 * 10,
                    //     dataTypes: "json",
                    //     successes: function (data) {
                    //         var adatas = JSON.parse(data);
                    //         console.log(adatas);
                    //     }
                    // });
                }
            });
        },
        /*实现开启关闭规则框*/
        closeRule: function() {
            var _this = this;
            $(".rulebtn").on("touchend", function(event) {
                event.preventDefault();

                $(".showBackbox").show();
                $(".rulebox").show();
                $(".leaderbox").hide();

                $(".rulebox").removeClass("fadeOutRight");

                $(".rulebox").addClass("animated fadeInRight");
            });

            $(".closebtn").on("touchend", function(event) {
                event.preventDefault();

                if(!_this.bigbox) {
                    $(".rulebox").removeClass("fadeInRight");
                    $(".leaderbox").removeClass("fadeInRight");

                    $(".rulebox").addClass("animated fadeOutRight");
                    $(".leaderbox").addClass("animated fadeOutRight");

                    $(".showBackbox").hide();
                    // $(".rulebox").hide();
                    // $(".leaderbox").hide();
                    console.log(123);
                } else {
                    _this.bigbox.show();
                    $(".rulebox").removeClass("fadeInRight");
                    $(".leaderbox").removeClass("fadeInRight");
                    _this.bigbox.removeClass("fadeOutRight");

                    $(".rulebox").addClass("animated fadeOutRight");
                    $(".leaderbox").addClass("animated fadeOutRight");

                    _this.bigbox.addClass("animated fadeInRight");
                    // $(".showBackbox").hide();

                    // $(".rulebox").hide();
                    // $(".leaderbox").hide();
                }
            });

            $("#isDeletes").on("touchend", function(event) {
                event.preventDefault();
                $(this).hide();
                _this.bigbox.show();
            });
        },
        /*实现奖品的tab切换*/
        awardTab: function() {
            $(".rewardtab .tit").on("touchend", function() {
                $(this).addClass("titsel").siblings(".tit").removeClass("titsel");
                $(".rewardcon .con").eq($(this).index()).addClass("consel").siblings(".con").removeClass("consel");
            });
        },
        /*切换奖品区*/
        changeAward: function() {
            $(".actprize").on("touchend", function() {
                $(this).addClass("add1");
                $(".myprize").removeClass("add2");
                $(".rewardbox").show();
                $(".randombox").hide();
            });

            $(".myprize").on("touchend", function() {
                $(this).addClass("add2");
                $(".actprize").removeClass("add1");
                $(".rewardbox").hide();
                $(".randombox").show();

                //获取我的奖品
                Ajax({
                    urls: "shop/teacheractivity!showOwnReward.do",
                    types: "get",
                    dataTypes: "json",
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);
                        $(".randombox").empty();
                        $.each(datas.res_data.list, function(i) {
                            $(".randombox").append(
                                "<dl class='voucher clearfix' ids='" + datas.res_data.list[i].cpns_id + "'>" +
                                    "<a href='http://wx.cheertea.com'>" +
                                        "<dt class='imgbox'>" +
                                            "<img src='" + imgchange.show(datas.res_data.list[i].cpns_img) + "' alt=''>" +
                                        "</dt>" +
                                        "<dd class='rightcon'>" +
                                            "<p class='name'>" + datas.res_data.list[i].reward_name + "</p>" +
                                        "</dd>" +
                                    "</a>" +
                                "</dl>"
                            );
                        });
                    }
                });
            });
        },
        /*显示排行榜*/
        showLeadbox: function() {
            $(".leadbtn").on("touchend", function() {
                // fadeInRight
                $(".showBackbox").show();
                $(".leaderbox").show();
                $(".rulebox").hide();
                $(".leaderbox").removeClass("fadeOutRight");

                $(".leaderbox").addClass("animated fadeInRight");

                //获取排行榜数据
                Ajax({
                    urls: "shop/teacheractivity!showRank.do",
                    types: "get",
                    dataTypes: "json",
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);

                        if(datas.res_code == 1) {
                            $(".topofscore .scorenum").html(datas.res_data.big_number);
                            $(".topofscore .alllead").html(datas.res_data.own_rank);

                            $(".firstbox").empty();
                            $.each(datas.res_data.list, function(i) {
                                $(".firstbox").append(
                                    "<li class='clearfix'>" +
                                        "<span class='num'>No." + i + "</span>" +
                                        "<img src='" + datas.res_data.list[i].weixin_face + "' alt='' class='imgboxs'>" +
                                        "<div class='rightcons'>" +
                                            "<p class='names'>" + datas.res_data.list[i].uname + "</p>" +
                                            "<p class='details'>玩了<span class='nums'>" + datas.res_data.list[i].play_count + "</span>次，最高纪录<span class='topnum'>" + datas.res_data.list[i].number + "</span>个</p>" +
                                        "</div>" +
                                    "</li>"
                                );
                            });
                        }
                    }
                });
            });
        },
        // /*切换排行榜*/
        // changeLeaderbox: function() {
        //     $(".leadtab .first").on("touchend", function() {
        //         $(this).addClass("firstsel");
        //         $(".firstbox").show();
        //         $(".secondbox").hide();
        //         $(".leadtab .second").removeClass("secondsel");
        //     });
        //
        //     $(".leadtab .second").on("touchend", function() {
        //         $(this).addClass("secondsel");
        //         $(".secondbox").show();
        //         $(".firstbox").hide();
        //         $(".leadtab .first").removeClass("firstsel");
        //     });
        // },
        /*弹出商品页面*/
        showBtn: function() {
            var _this = this;

            $(".leftbox").on("touchend", function(event) {
                event.preventDefault();
                $(".bigcelebratebox").hide();
                $(".bigshamebox").hide();
                $(".rulebox").show();
                $(".tabul li").eq(1).addClass("lisel").siblings(".tabul li").removeClass("lisel");
                $(".conul .cons").eq(1).addClass("showcons").siblings(".cons").removeClass("showcons");

                $(".rulebox").removeClass("fadeOutRight");
                $(".rulebox").addClass("animated fadeInRight");

                /*获取排名中奖列表*/
                _this.getAwardAjax(1);

                /*获取随机中奖列表*/
                _this.getAwardAjax(2);
            });

            $(".rightbox").on("touchend", function(event) {
                event.preventDefault();
                $(".bigcelebratebox").hide();
                $(".bigshamebox").hide();
                $(".rulebox").show();
                $(".tabul li").eq(1).addClass("lisel").siblings(".tabul li").removeClass("lisel");
                $(".conul .cons").eq(1).addClass("showcons").siblings(".cons").removeClass("showcons");
                $(".myprize").addClass("add2");
                $(".actprize").removeClass("add1");
                $(".rewardbox").hide();
                $(".randombox").show();

                $(".rulebox").removeClass("fadeOutRight");
                $(".rulebox").addClass("animated fadeInRight");

                /*获取排名中奖列表*/
                _this.getAwardAjax(1);

                /*获取随机中奖列表*/
                _this.getAwardAjax(2);
            });

            /*点击出现排行榜*/
            $(".newleadbtn").on("touchend", function() {
                $(".bigcelebratebox").hide();
                $(".bigshamebox").hide();
                $(".leaderbox").show();

                $(".leaderbox").removeClass("fadeOutRight");
                $(".leaderbox").addClass("animated fadeInRight");

                //获取排行榜数据
                Ajax({
                    urls: "shop/teacheractivity!showRank.do",
                    types: "get",
                    dataTypes: "json",
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);

                        if(datas.res_code == 1) {
                            $(".topofscore .scorenum").html(datas.res_data.big_number);
                            $(".topofscore .alllead").html(datas.res_data.own_rank);

                            $(".firstbox").empty();
                            $.each(datas.res_data.list, function(i) {
                                $(".firstbox").append(
                                    "<li class='clearfix'>" +
                                    "<span class='num'>No." + i + "</span>" +
                                    "<img src='" + datas.res_data.list[i].weixin_face + "' alt='' class='imgboxs'>" +
                                    "<div class='rightcons'>" +
                                    "<p class='names'>" + datas.res_data.list[i].uname + "</p>" +
                                    "<p class='details'>玩了<span class='nums'>" + datas.res_data.list[i].play_count + "</span>次，最高纪录<span class='topnum'>" + datas.res_data.list[i].number + "</span>个</p>" +
                                    "</div>" +
                                    "</li>"
                                );
                            });
                        }
                    }
                });
            });

            /*显示分享框*/
            $(".findfriends").on("touchend", function() {
                $(".bigcelebratebox").hide();
                $(".bigshamebox").hide();
                $("#isDeletes").show();
            });
        },
        /*设计倒计时*/
        countDown: function(number) {
            var _this = this;

            $(".maintitle .countdown").html((number / 100).toFixed(2));
            this.timers = setInterval(function() {
                number--;
                $(".maintitle .countdown").html((number / 100).toFixed(2));
                if(number <= 0) {
                    number = 0;
                    $(".maintitle .countdown").html((number / 100).toFixed(2));

                    clearInterval(_this.timers);
                    for(var i = 0; i < 3; i++) {
                        clearInterval(_this.timer[i]);
                    }

                    //根据不同的分数，弹出不同的弹窗
                    $(".showBackbox").show();
                    if(_this.score >= 10) {
                        $(".smallcelebratebox").show();

                        $(".smallcelebratebox").removeClass("fadeOutRight");
                        $(".smallcelebratebox").addClass("animated fadeInRight");
                    } else {
                        $(".smallshamebox").show();

                        $(".smallshamebox").removeClass("fadeOutRight");
                        $(".smallshamebox").addClass("animated fadeInRight");
                    }

                    //将数据传递给后台
                    Ajax({
                        urls: "shop/teacheractivity!endGame.do",
                        types: "get",
                        dataTypes: "json",
                        datas: {
                            play_num: $(".totalscore span").html()
                        },
                        successes: function (data) {
                            var datas = JSON.parse(data);
                            console.log(datas);
                            $(".lastnumber .have").html(datas.res_data.day_remain_draw_count);
                            $(".gradebox .grade").html(datas.res_data.play_num);
                            $(".gradebox .newnum").html(datas.res_data.percent);
                            $(".gradebox .top").html(datas.res_data.big_number);
                            $(".gradebox .actlead").html(datas.res_data.own_rank);
                            $(".smallcelebratebox").on("touchend", ".smallbtn", function() {
                                if(datas.res_data.day_remain_draw_count > 0) {
                                    $("#drawwrap").show();

                                    //传递抽奖数据
                                    Ajax({
                                        urls: "shop/teacheractivity!doLottery.do",
                                        types: "get",
                                        dataTypes: "json",
                                        successes: function (data) {
                                            var datass = JSON.parse(data);
                                            console.log(datass);

                                            /*实现转盘内容*/
                                            _this.drawSelection(datass.res_data.is_win, datass.res_data.reward_result);
                                        }
                                    });
                                } else {
                                    alert("没有抽奖次数");
                                }
                            });
                        }
                    });
                }
            }, 10);
        },
        /*设置参数*/
        setSetting: function(indexs) {
            var _this = this;

            /*持续往后运动*/
            this.timer[indexs] = setInterval(function() {
                _this.posY[indexs] += _this.posYSpeed;
                if(_this.posY[indexs] >= 2.2) {
                    _this.posY[indexs] = 2.2;
                    _this.posX[indexs] = _this.posX[indexs] - _this.speeds;

                    /*游戏结束*/
                    if(_this.posX[indexs] < 0) {
                        clearInterval(_this.timers);
                        for(var i = 0; i < 3; i++) {
                            clearInterval(_this.timer[i]);

                            //清空所有快
                            $(".mainbox").eq(i).empty();
                        }

                        //根据不同的分数，弹出不同的弹窗
                        $(".showBackbox").show();
                        if(_this.score >= 10) {
                            $(".smallcelebratebox").show();

                            $(".smallcelebratebox").removeClass("fadeOutRight");
                            $(".smallcelebratebox").addClass("animated fadeInRight");
                        } else {
                            $(".smallshamebox").show();

                            $(".smallshamebox").removeClass("fadeOutRight");
                            $(".smallshamebox").addClass("animated fadeInRight");
                        }

                        //将数据传递给后台
                        Ajax({
                            urls: "shop/teacheractivity!endGame.do",
                            types: "get",
                            dataTypes: "json",
                            datas: {
                                play_num: $(".totalscore span").html()
                            },
                            successes: function (data) {
                                var datas = JSON.parse(data);
                                console.log(datas);
                                $(".lastnumber .have").html(datas.res_data.day_remain_draw_count);
                                $(".gradebox .grade").html(datas.res_data.play_num);
                                $(".gradebox .newnum").html(datas.res_data.percent);
                                $(".gradebox .top").html(datas.res_data.big_number);
                                $(".gradebox .actlead").html(datas.res_data.own_rank);
                                $(".smallcelebratebox").on("touchend", ".smallbtn", function() {
                                    if(datas.res_data.day_remain_draw_count > 0) {
                                        $("#drawwrap").show();

                                        //传递抽奖数据
                                        Ajax({
                                            urls: "shop/teacheractivity!doLottery.do",
                                            types: "get",
                                            dataTypes: "json",
                                            successes: function (data) {
                                                var datass = JSON.parse(data);
                                                console.log(datass);
                                                console.log(datass.res_data.reward_result)
                                                /*实现转盘内容*/
                                                _this.drawSelection(datass.res_data.is_win, datass.res_data.reward_result);
                                            }
                                        });
                                    } else {
                                        alert("没有抽奖次数");
                                    }
                                });
                            }
                        });
                    }
                }
                $(".mainbox").eq(indexs).find(".role").css({
                    transform: "translate(" + _this.posX[indexs] + "rem, " + _this.posY[indexs] + "rem)"
                });
            }, 16);
        },
        /*点击的时候当前添加距离*/
        addPosX: function(secondScore, thirdScore) {
            var _this = this;

            $(".mainbox").on("touchend", function() {
                if(_this.posY[$(this).index()] >= 2.2) {
                    _this.posX[$(this).index()] += (_this.speeds * 50);

                    //当学生到达posX为6的时候, 取消该块, 分数增加1
                    if(_this.posX[$(this).index()] >= 6) {
                        _this.score += 2;

                        //添加其他块的学生
                        if(_this.score > secondScore) {
                            if(!($(".mainbox").eq(1).find(".role")).length) {
                                $(".mainbox").eq(1).append("<div class='role'></div>");
                                clearInterval(_this.timer[1]);
                                _this.setSetting(1);
                            }
                        }

                        if(_this.score > thirdScore) {
                            if(!($(".mainbox").eq(2).find(".role")).length) {
                                $(".mainbox").eq(2).append("<div class='role'></div>");
                                clearInterval(_this.timer[2]);
                                _this.setSetting(2);
                            }
                        }

                        $(".totalscore span").html(_this.score);
                        $(this).find(".role").remove();
                        clearInterval(_this.timer[$(this).index()]);

                        //初始化数据
                        _this.posX[$(this).index()] = 2;
                        _this.posY[$(this).index()] = 0;

                        $(this).find(".role").css({
                            transform: "translate(" + _this.posX[$(this).index()] + "rem, " + _this.posY[$(this).index()] + "rem)"
                        });
                        $(this).append("<div class='role'></div>");

                        _this.setSetting($(this).index());
                    }
                }
            });
        },
        /*小弹窗功能*/
        smallBox: function() {
            var _this = this;

            $(".smallshamebox").on("touchend", ".newchacha", function(event) {
                _this.bigbox = $(".bigshamebox");
                event.preventDefault();
                $(".smallshamebox").hide();
                $(".smallshamebox").removeClass("animated fadeInRight");
                $(".bigshamebox").show();

                $(".smallshamebox").removeClass("animated fadeOutRight");
                $(".bigshamebox").addClass("animated fadeInRight");
            });

            $(".smallcelebratebox").on("touchend", ".newchacha", function(event) {
                _this.bigbox = $(".bigcelebratebox");
                event.preventDefault();
                $(".smallcelebratebox").hide();
                $(".bigcelebratebox").show();
            });
        },
        /*重新开始*/
        againBtn: function() {
            var _this = this;

            $(".againbtn").on("touchend", function() {

                //初始化数据
                for(var i = 0; i < 3; i++) {
                    $(".mainbox").eq(i).empty();
                }
                _this.score = 0;
                $(".totalscore span").html(_this.score);
                _this.posX = [];
                _this.posY = [];

                for(var i = 0; i < 3; i++) {
                    _this.posX[i] = 2
                    _this.posY[i] = 0;
                }

                $(".showBackbox").hide();
                _this.bigbox.hide();
                _this.bigbox = null;
                /**
                 * speed 速度
                 */
                _this.setSetting(0);

                //增加第一个块的学生
                $(".mainbox").eq(0).append("<div class='role'></div>");

                /*设计倒计时*/
                _this.countDown(1000);
            });
        },
        /*实现转盘内容*/
        drawSelection: function(numbers, newdata) {
            console.log(newdata)
            //随机放置奖品
            var randomSum = Math.floor(Math.random() * 9);
            (randomSum == 4) && (randomSum = randomSum - 1);
            $(".getPrizebox li").eq(randomSum).addClass("addli").siblings("li").removeClass("addli");

            //旋转转盘
            var drawtimes = 1;
            var speed = 20;
            var indexs = -1;
            var other = 0;
            var drawTimer1 = null;

            function show() {
                if(indexs >= -1 && indexs < 2) {
                    indexs++;
                    $(".getPrizebox li").eq(indexs).addClass("showli").siblings("li").removeClass("showli");
                } else if(((indexs + 1) % 3) == 0 && !other) {
                    indexs += 3;
                    $(".getPrizebox li").eq(indexs).addClass("showli").siblings("li").removeClass("showli");
                    (indexs == 8) && (other = 1);
                } else if(indexs > 6 && indexs <= 8) {
                    indexs--;
                    other = 0;
                    $(".getPrizebox li").eq(indexs).addClass("showli").siblings("li").removeClass("showli");
                } else if(indexs % 3 == 0) {
                    indexs -= 3;
                    (indexs < 0) && (indexs = 0);
                    $(".getPrizebox li").eq(indexs).addClass("showli").siblings("li").removeClass("showli");
                }
                drawtimes += speed;

                drawTimer1 = setTimeout(function() {
                    show();
                }, drawtimes);

                if(drawtimes >= 300) {
                    if(numbers == 1) {
                        if(indexs == randomSum) {
                            console.log("你中奖了!");
                            setTimeout(function() {
                                $(".showPrizebox").show();
                                $(".prizethings").html(newdata);
                            }, 1000);
                            clearTimeout(drawTimer1);

                            setTimeout(function() {
                                $("#drawwrap").hide();
                                $(".smallcelebratebox").hide();
                                $(".bigcelebratebox").show();
                            }, 3000);
                        }
                    } else {
                        if(indexs != randomSum) {
                            console.log("你没有中奖!");
                            clearTimeout(drawTimer1);

                            setTimeout(function() {
                                $("#drawwrap").hide();
                                $(".smallcelebratebox").hide();
                                $(".bigcelebratebox").show();
                            }, 3000);
                        }
                    }
                }
            }
            drawTimer1 = setTimeout(function() {
                show();
            }, drawtimes);
        },
        /*奖品数据接口*/
        getAwardAjax: function(nums) {

            //获取奖品列表
            Ajax({
                urls: "shop/teacheractivity!showReward.do",
                types: "get",
                dataTypes: "json",
                datas: {
                    reward_type: nums
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);
                    $(".rewardcon .con").eq(nums - 1).empty();
                    $.each(datas.res_data.reward_list, function(i) {
                        $(".rewardcon .con").eq(nums - 1).append(
                            "<dl class='voucher clearfix' ids='" + datas.res_data.reward_list[i].cpns_id + "'>" +
                                "<a href='http://wx.cheertea.com'>" +
                                    "<dt class='imgbox'>" +
                                        "<img src='" + imgchange.show(datas.res_data.reward_list[i].cpns_img) + "' alt=''>" +
                                    "</dt>" +
                                    "<dd class='rightcon'>" +
                                        "<p class='name'>" + datas.res_data.reward_list[i].reward_name + "</p>" +
                                    "</dd>" +
                                "</a>" +
                            "</dl>"
                        );
                    });
                }
            });
        },
        /*开始游戏*/
        startGame: function() {
            this.timer = [];
            this.score = 0;

            //初始化数据
            this.posX = [];
            this.posY = [];
            for(var i = 0; i < 3; i++) {
                this.posX[i] = 2;
                this.posY[i] = 0;
            }

            this.speeds = 0.02;
            this.posYSpeed = 0.04;

            var _this = this;

            $(".startbtn").on("touchend", function() {
                $(".teachertitlebgbox").hide();
                $("#teachersdaywrap").hide();
                $("#teachersdaystart").show();

                /**
                 * speed 速度
                 */
                _this.setSetting(0);

                //增加第一个块的学生
                $(".mainbox").eq(0).append("<div class='role'></div>");

                /*设计倒计时*/
                _this.countDown(1000);
            });

            /*增加移动距离*/
            this.addPosX(4, 12);
        },
        /*初始化ajax*/
        initAjax: function() {

            //首页接口
            Ajax({
                urls: "shop/teacheractivity!initGame.do",
                types: "get",
                dataTypes: "json",
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    //添加头部
                    $('.teachertitlebgbox').addClass('animated zoomInDown');
                }
            });
        },
        init: function() {

            //获取当前大弹窗
            this.bigbox = null;

            /*实现登录*/
            this.isLogin();

            /*实现tab切换*/
            this.showRuleTab();

            /*开启关闭规则框*/
            this.closeRule();

            /*实现奖品的兑换*/
            this.awardTab();

            /*切换奖品区*/
            this.changeAward();

            /*显示排行榜*/
            this.showLeadbox();

            // /*切换排行榜*/
            // this.changeLeaderbox();

            /*弹出商品页面*/
            this.showBtn();

            /*开始游戏*/
            this.startGame();

            /*小弹窗功能*/
            this.smallBox();

            /*重新开始游戏*/
            this.againBtn();

            /*初始化游戏*/
            this.initAjax();

            /*获取排名中奖列表*/
            this.getAwardAjax(1);

            /*获取随机中奖列表*/
            this.getAwardAjax(2);
        }
    }
    Teachersday.init();
})();
