




;(function() {
    // var $ = require("./common/zepto");
    var $ = require("./common/jquery.min");
    // require("./common/fx");
    // require("./common/fx_methods");
    // require('./common/selector');
    // require('./common/touch');
    require('./common/fastclick');
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var catchmoonprize={
        init:function () {
            //判断入口房间
                var _this=this;
                var headTitle= $('head').find('title');
                var  publicSignal=this.isEarn('publicSignal');
                var moonRoom=$('.moonroom');
                var roomID=this.isEarn('roomID');
                var bgUrl=this.isEarn('bgUrl');
                var typeName=this.isEarn('typeName');
                headTitle.html(typeName);
            //      switch(+roomID){
            //     case 1:
            //         headTitle.html('巨柚园');
            //         moonRoom.addClass('moonroom-juyou');
            //         break;
            //     case 2:
            //              headTitle.html('清雅源');
            //              moonRoom.addClass('moonroom-qingya');
            //              break;
            //     case 11:
            //         headTitle.html('银雁');
            //         moonRoom.addClass('moonroom-yinyan');
            //         break;
            //     case 12:
            //          headTitle.html('六三饼铺');
            //         moonRoom.addClass('moonroom-bingpu');
            //         break;
            //     case 13:
            //          headTitle.html('海马');
            //         moonRoom.addClass('moonroom-haima');
            //         break;
            //     case 14:
            //          headTitle.html('i慧生活');
            //         moonRoom.addClass('moonroom-shenghuo');
            //         break;
            // }
            // 初始化数据

            moonRoom.css({
                background:"url(" + bgUrl + ") no-repeat",
                backgroundSize: "100% 100%"
            });
            // console.log(decodeURIComponent(publicSignal))
            $('.public-num').click(function () {
                if(!!publicSignal){
                    window.location.href=publicSignal;
                }else{
                    return false;
                }
            });
            roomAjax();
            function roomAjax() {
                $.ajax({
                    url:publics+'shop/bettingMoonCake!getBettingCount.do',
                    type:'post',
                    dataType:'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success:function (data) {
                        console.log('获取成功');
                        console.log(data);
                        // if(data.res_code==0){
                        //     window.location.href = "cn/login.html?forward=" + window.location.pathname;
                        // }
                        if(data.res_code==1){
                            $('.gamechanges-num').html(data.res_data.all_count);
                            if(data.res_data.all_count==0){
                                $('#showDelete').show();
                                $('.showMessagebox').show();
                                $('.noprizenum').show();
                            }
                        }
                    },
                    error:function () {
                        console.log('用户数据获取失败')
                    }
                });
            }
            // 开始博饼
            this.catchmoon();
            //去推荐分享按钮
            this.goshare();
            //取消默认事件
            $(document).on("touchmove", function(event) {
                event.preventDefault();
            });
            $('#shares').on('click',function (event) {
                $(this).hide();
            });
        },
        catchmoon:function () {
            var dicestimer = null;
            var timerbox=null;
            var fontTime=null;
            var onOff=true;//博饼按钮开关，防止多次点击
            var roomID=this.isEarn('roomID');
            var result=0;
            var _this=this;
            $('.gamestartbetting').on('click',function () {
                console.log(!!$('.gamechanges-num').html());
                if($('.gamechanges-num').html()<=0){
                    $('#showDelete').show();
                    $('.showMessagebox').show();
                    $('.noprizenum').show();
                    return false;
                }
                // 开始博饼游戏
                if(onOff){
                    _this.bindAudio($('#touzi').get(0));
                    onOff=false;
                    $.ajax({
                        url:publics+'shop/bettingMoonCake!bettingMoonCake.do',
                        type:'post',
                        dataType:'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        data:{
                            room_id:roomID
                        },
                        success:function (data) {
                            // console.log(data);
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
                                    "top: " + ~~(Math.random() * $(".dicebox").height()/3*2+14 ) + "px;" +
                                    "left: " + ~~(Math.random() * $(".dicebox").width()/3*2+20) + "px;" +
                                    "}" +
                                    "40% {" +
                                    "top: " + ~~(Math.random() * $(".dicebox").height()/3*2+14) + "px;" +
                                    "left: " + ~~(Math.random() * $(".dicebox").width()/3*2+20) + "px;" +
                                    "}" +
                                    "60% {" +
                                    "top: " + ~~(Math.random() * $(".dicebox").height()/3*2+14 ) + "px;" +
                                    "left: " + ~~(Math.random() * $(".dicebox").width()/3*2+20) + "px;" +
                                    "}" +
                                    "80% {" +
                                    "top: " + ~~(Math.random() * $(".dicebox").height()/3*2+14) + "px;" +
                                    "left: " + ~~(Math.random() * $(".dicebox").width()/3*2+20) + "px;" +
                                    "}" +
                                    "100% {" +
                                    "top: " + oldTop + "px;" +
                                    "left: " + oldLeft + "px;" +
                                    "}" +
                                    "}\n";

                                $("#styles").html(csshtml);
                                //变换图片
                                $(".dicebox li").eq(i).css({
                                    background: "url('http://images.cheertea.com/1.gif') 0 0 no-repeat !important",
                                    backgroundSize: "100% 100% !important",
                                    animation: "alls" + i + " 0.6s linear infinite"
                                });
                            });
                            clearTimeout(dicestimer);
                            var dicesArr=data.res_data.die;
                            result=data.res_data.result;
                            dicestimer = setTimeout(function() {
                                $.each(dicesArr, function(i) {
                                    //变换图片
                                    // console.log('11111')
                                    $(".dicebox li").eq(i).css({
                                        background: "url(" + 'http://images.cheertea.com/' + dicesArr[i] + ".png) 0 0 no-repeat",
                                        backgroundSize: "100% 100%",
                                        animation: "none"
                                    });
                                });
                                clearTimeout(timerbox);
                                timerbox = setTimeout(function() {
                                    //判断是否中奖
                                    $('#showDelete').show();
                                    $('.showMessagebox').show();
                                    if(data.res_data.gain_score>=1){
                                        // $('.noprizenum').hide();
                                        // $('.nogetprize').hide();
                                        $('.getnewprize').show();
                                        $('.prizetype').html(data.res_data.reward_result);
                                        // $('.prizescore').find('span').html(data.res_data.gain_score);
                                        $('.prizescore').html('+'+data.res_data.gain_score+'分')
                                        clearTimeout(fontTime)
                                        fontTime=setTimeout(function () {
                                            $('.prizescore').css({opacity:1,display:'block'})
                                            $('.prizescore').animate({fontSize:'28',opacity:0,top:'5%'},3000,function () {
                                                $('.prizescore').css({fontSize:'42',top:'64%'},0)
                                            })
                                        },500)
                                    }else{
                                        // $('.getnewprize').hide();
                                        // $('.noprizenum').hide();
                                        $('.nogetprize').show();
                                    }
                                    $('.gamechanges-num').html(data.res_data.all_count);
                                    //显示弹窗
                                    if(result==1 ||result==2 ||result==3 ){
                                        _this.bindAudio($('#putong').get(0));
                                    }
                                    if(result==4){
                                        _this.bindAudio($('#sanhong').get(0));
                                    }
                                    if(result==5){
                                        _this.bindAudio($('#duitang').get(0));
                                    }
                                    if(result==6){
                                        _this.bindAudio($('#zhuangyuan').get(0));
                                    }
                                    onOff=true;
                                }, 1000);
                            }, 1500);
                            //按钮功能
                        },
                        error:function () {
                            console.log('博饼失败');
                        }
                    })
                }
            });

            //关闭弹窗
            $('.moonclose').on('click',function () {
                $('#showDelete').hide();
                $('.noprizenum').hide();
                $('.nogetprize').hide();
                $('.getnewprize').hide();
            });
            $('.nogetprize').find('button').click(function () {
                $('#showDelete').hide();
                $('.nogetprize').hide();
            });
            //按钮操作
            $('.getnewprizebtn-left').on('click',function () {
                $('.showMessagebox').hide();
                $('.getnewprize').hide();
                $('.showbox').show();
                $.ajax({
                    url:publics+'shop/bettingMoonCake!exchangeReward.do?',
                    type:'post',
                    dataType:'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data:{
                        result:result
                    },
                    success:function (data) {
                        // console.log(data);
                        $('.showbox').find('p').html(data.res_data.reward);
                    }
                })
            });
            $('.getnewprizebtn-right').on('click',function () {
                $('.showMessagebox').hide();
                $('.getnewprize').hide();
                $('.showbox').show();
                $.ajax({
                    url:publics+'shop/bettingMoonCake!exchangeDrawCount.do',
                    type:'post',
                    dataType:'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data:{
                        result:result
                    },
                    success:function (data) {
                        // console.log(data)
                        $('.showbox').find('p').html(data.res_data.add_draw_count + '次抽奖次数')
                    }
                })
            });
            //点击确定关闭弹窗
            $('.showbox').find('div').click(function () {
                $('#showDelete').hide();
                $('.showbox').hide();
            })
        },
        goshare:function () {
            var _this=this;
            $.ajax({
                url: publics+"member/login!isLogin.do",
                type: "get",
                async: false,
                timeout: 1000 * 10,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    // var datas = JSON.parse(data);
                    if(data.res_code == 1) {
                        //微信分享
                        _this.shareWx(data.res_data.member.member_id)
                    }
                },
                error:function () {
                    console.log('网络出错')
                }
            });
            $('.goshare').on('click',function () {
                   $('#showDelete').hide();
                   $('#shares').show();
            })
        },
        shareWx: function(ids) {
                var url = location.href;
                var member_id = ids;
                var image_url = "http://images.cheertea.com/logonews.png";
                if(member_id != "" && member_id != undefined && member_id != null){
                    var shareUrl =publics+'cn/catchmoonguide.html?memberid=' + member_id;
                    $.ajax({
                        type:'POST',
                        url:publics+'widget?type=group_activity&action=ajaxsign&ajax=yes',
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
                                    title: " 巨柚博状元 全国乐中秋", // 分享标题
                                    link: shareUrl,
                                    desc:"缤纷豪礼送不停，更有￥4999现金大奖等着你！",
                                    imgUrl: image_url , // 分享图标
                                    success: function () {
                                        // 用户确认分享后执行的回调函数
                                        $('#shares').hide();
                                    },
                                    cancel: function () {
                                        // 用户取消分享后执行的回调函数
                                    }
                                });
                                // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                                wx.onMenuShareAppMessage({
                                    title: " 巨柚博状元 全国乐中秋", // 分享标题
                                    link: shareUrl,
                                    desc:"缤纷豪礼送不停，更有￥4999现金大奖等着你！",
                                    imgUrl: image_url, // 分享图标
                                    type: data.type, // 分享类型,music、video或link，不填默认为link
                                    success: function () {
                                        // 用户确认分享后执行的回调函数
                                        $('#shares').hide();
                                    },
                                    cancel: function () {
                                        // 用户取消分享后执行的回调函数
                                    }
                                });

                                //获取“分享到QQ”按钮点击状态及自定义分享内容接口
                                wx.onMenuShareQQ({
                                    title: " 巨柚博状元 全国乐中秋", // 分享标题
                                    link: shareUrl,
                                    desc:"缤纷豪礼送不停，更有￥4999现金大奖等着你！",
                                    imgUrl: image_url, // 分享图标
                                    success: function () {
                                        // 用户确认分享后执行的回调函数
                                        $('#shares').hide();
                                    },
                                    cancel: function () {
                                        // 用户取消分享后执行的回调函数
                                    }
                                });

                                //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                                wx.onMenuShareQZone({
                                    title: " 巨柚博状元 全国乐中秋", // 分享标题
                                    link: shareUrl,
                                    desc:"缤纷豪礼送不停，更有￥4999现金大奖等着你！",
                                    imgUrl: image_url, // 分享图标
                                    success: function () {
                                        // 用户确认分享后执行的回调函数
                                        $('#shares').hide();
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
        isEarn: function(name) {

            //正则判断URL是否存在当前
            var veg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substring(1).match(veg);
            if(r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },
        bindAudio:function (item) {
            item.play()
        }
    }
    catchmoonprize.init();


})()