

;(function() {
    var $ = require("./common/jquery.min");
    var Ajax = require("./function/ajax");
     require("./common/lCalendar.min");
    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }

    var catchmooncake= {
        url:'',
        init: function () {
            // $('html,body').animate({scrollTop: 100}, 0);
                //判断是否登陆 用户信息渲染
                // this.isLogin();
                //判断是否有上级
                var _this=this;
                var parentId = this.isEarn("memberid");
                if(!parentId) {
                    this.isLogin();
                }else{
                    this.takeParentID()
                }
                this.jumpUrl();
                //分享加机会
                this.goshare();
                //加载时间选择器
                var calendar = new lCalendar();
                calendar.init({
                    'trigger': '#selection-time',
                    'type': 'date'
                });
                //初始化时间及排行榜
                var now = new Date();
                var str =now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();//2017-08-01
                var timeTextbtn=$('#selection-time');
                timeTextbtn.val(str);
                timeList();
                //排行榜无缝滚动
                var scrollTimer=null;
                var listWrap=$('.catch-list-wrap').get(0);
                var listUlTop=$('.catch-list-top').get(0);
                var listUlBottom=$('.catch-list-bottom').get(0);
                function Marquee() {
                    if (listUlBottom.offsetTop - listWrap.scrollTop < 0)
                        listWrap.scrollTop -= listUlTop.offsetHeight;
                    else {
                        listWrap.scrollTop++
                    }
                }
                function timeList() {
                    var timeStr=timeTextbtn.val();
                    timeStr = timeStr.replace(/-/g,'/');
                    var date = new Date(timeStr);
                    var time = date.getTime();//转为13位时间戳
                    $.ajax({
                        url:publics+'shop/bettingMoonCake!showRank.do',
                        type:'post',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType:'json',
                        data:{
                            rank_time:time
                        },
                        success:function (data) {
                           // console.log(data);
                            $('.catch-list-ct').html('');
                              $.each(data.res_data.list,function (i) {
                                    var tels=!!data.res_data.list[i].mobile && (data.res_data.list[i].mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                    if(!tels){
                                        tels='未绑定手机号';
                                    }
                                    $('.catch-list-top').append(
                                        "<li>"+
                                        "<span>"+(i+1)+"</span>"+
                                        "<span>"+tels+"</span>"+
                                        "<span>"+data.res_data.list[i].after_score+"</span>"+
                                        "</li>"
                                    )
                                });
                              //判断数据长度是否超过可视区，超过即滚动
                              if (data.res_data.list.length>=5){
                                  listUlBottom.innerHTML+=listUlTop.innerHTML;
                                  clearInterval(scrollTimer);
                                  listWrap.scrollTop=0;
                                  scrollTimer=setInterval(Marquee,30)
                              }
                        },
                        error:function () {
                            console.log('请求失败，请重试')
                        }
                    })
                }
                var scrollTimer1=null;
                var scrollWrap=$('.scroll-wrap').get(0);
                var wrapLeft=$('.wrap-left').get(0);
                var wrapRight=$('.wrap-right').get(0);
                 wrapRight.innerHTML=wrapLeft.innerHTML;
                 scrollTimer1=setInterval(Marquee1,30)
                function Marquee1() {
                if (wrapRight.offsetWidth - scrollWrap.scrollLeft <=0)
                    scrollWrap.scrollLeft -= wrapLeft.offsetWidth;
                else {
                    scrollWrap.scrollLeft++
                }
            }

                //房间选择
                 this.enterRoom();
                //王中王剩余时间
                this.timeFly();
                //监听时间输入框值是否变化
                timeTextbtn.on('input',function () {
                    timeList();
                });
                //指引遮罩
                var timerScroll=null;
                timerScroll=setTimeout(function () {
                    console.log($('.login').position().left);
                    // if(!!recom){
                    //     var scroll=0
                    //     $('html,body').animate({scrollTop: 100}, 0);
                    //     return
                    // }
                    // if(!!rule){
                    //     $('html,body').animate({scrollTop: 100}, 0);
                    //     return
                    // }
                    if(window.scrollY==0){
                        $('.guide').show();
                    }
                },800);
                //阻止遮罩默认行为
                $('body').on('touchmove','.gearDate',function (event) {
                    event.preventDefault()
                });
                $('#shares').on('touchmove',function (event) {
                    event.preventDefault()
                });
                $('#shares').on('click',function (event) {
                $(this).hide();
            });
                $('.guide').on('touchmove',function (event) {
                    event.preventDefault()
                });
                $('.guide').on('click',function (event) {
                    $(this).hide();
                });
            },
        isLogin:function () {
            //登陆按钮点击事件
            var _this=this;
            // var loginBtn=$('.pre-login');
            // var wasLogin=$('.was-login');
             $.ajax({
                url:publics+"shop/bettingMoonCake!initGame.do",
                type:'post',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:'json',
                success:function (data) {
                    // console.log(data);
                    // console.log('成功获取个人数据');
                    // console.log(data.res_code);
                            if(data.res_code==0){
                                window.location.href = "/cn/login.html?forward=" + window.location.pathname;
                                    // var parentId = _this.isEarn("memberid");
                                    // if(!!parentId) {
                                    //     var url="/cn/login.html?state="+parentId+"&forward=" + window.location.pathname;
                                    //     window.location.href = url;
                                    // } else {
                                    //
                                    // }
                            }
                            if(data.res_code==1){
                                Ajax({
                                    urls: "member/isBindMobile.action",
                                    types: "get",
                                    asyncs: false,
                                    timeouts: 1000 * 10,
                                    dataTypes: "json",
                                    successes: function (datas) {
                                        if (datas.res_code == -1) {
                                            window.location.href = "/cn/bindphones.html?" + window.location.pathname + window.location.search;
                                        }
                                    }
                                });
                                // console.log(data)
                                $('.catch-cake-num').html(data.res_data.all_count+'次');
                                $('.catch-people-score').html(data.res_data.all_score+'分');
                                $('.catch-people-num').html(data.res_data.own_rank);
                                $('.catch-prize-num').html(data.res_data.all_draw_count+'次');
                }
                },
                error:function(){
                    console.log('获取数据失败');
                }
            })
        },
        timeFly:function () {
                var kingTime=null;
                function leftTimer(year,month,day,hour,minute,second){
                    var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
                    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
                    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
                    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                    days = checkTime(days);
                    hours = checkTime(hours);
                    minutes = checkTime(minutes);
                    seconds = checkTime(seconds);
                    var now = new Date().getTime(); //当前时间
                    var myTime = Date.parse("2017-10-20 08:00:00".replace(/-/g, "/"));
                    if(now-myTime >=0) {
                        clearInterval( kingTime);
                        days='00';
                        hours='00';
                        minutes='00';
                        seconds='00';
                    }
                    $('.day').html(days);
                    $('.hours').html(hours);
                    $('.minutes').html(minutes);
                    $('.seconds').html(seconds);
                }
                function checkTime(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
                kingTime=setInterval(function () {
                    leftTimer(2017,10,20,7,0,0);
                }, 1000);
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
        enterRoom:function () {
            var _this=this;
            $('.catchcakeapart').find('li').on('click',function (index) {
                    var roomID=$(this).attr('moonroom');
                    var typeName=$(this).attr('typeName');

                if(roomID>=1&& roomID<=6){
                    // window.location.href =';
                    _this.url='catchmoonroomlist.html?roomID='+roomID+'&typeName='+encodeURIComponent(typeName);
                    _this.sharePeopleLogin();
                }else{
                    var publicSignal=encodeURIComponent('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MDAwNzMwNw==&scene=124#wechat_redirect')
                    $.ajax({
                        url:publics+'shop/bettingMoonCake!enterRoom.do',
                        type:'post',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType:'json',
                        data:{
                            room_id:roomID
                        },
                        success:function (data) {
                            // console.log(data)
                          if(data.res_code==-1){
                                alert(data.res_info);
                                return false
                            }
                            _this.url='catchmoonroom.html?bgUrl='+'http://images.cheertea.com/middleautumn16.png&'+'publicSignal='+publicSignal+'&typeName='+encodeURIComponent(typeName);
                            _this.sharePeopleLogin();
                        }
                    })
                }
            })
            $('.go-catch').click(function () {
                    var positon=$('.catchcakeapart').get(0).offsetTop;
                $('html,body').animate({scrollTop: positon}, 'swing');
            })
        },
        goshare:function () {
            var _this=this;
            $('.invite-btn').click(function () {
                $.ajax({
                    url:publics+"shop/bettingMoonCake!initGame.do",
                    type:'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType:'json',
                    success:function (data) {
                        if(data.res_code==0){
                            var parentId = _this.isEarn("memberid");
                            window.location.href ="/cn/login.html?state="+parentId+"&forward=" + window.location.pathname;
                        }
                        if(data.res_code==1){
                            Ajax({
                                urls: "member/isBindMobile.action",
                                types: "get",
                                asyncs: false,
                                timeouts: 1000 * 10,
                                dataTypes: "json",
                                successes: function (datas) {
                                    if (datas.res_code == -1) {
                                        window.location.href = "/cn/bindphones.html?" + window.location.pathname + window.location.search;
                                    }else{
                                        $('#shares').show();
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
                                    }
                                }
                            });
                        }
                    },
                    error:function(){
                        console.log('获取数据失败');
                    }
                });


            });
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
        sharePeopleLogin: function () {
            var _this=this;
            $.ajax({
                url:publics+"shop/bettingMoonCake!initGame.do",
                type:'post',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:'json',
                success:function (data) {
                    // console.log(data);
                    // console.log('成功获取个人数据');
                    // console.log(data.res_code);
                    if(data.res_code==0){
                        var parentId = _this.isEarn("memberid");
                         window.location.href ="/cn/login.html?state="+parentId+"&forward=" + window.location.pathname;
                    }
                    if(data.res_code==1){
                        Ajax({
                            urls: "member/isBindMobile.action",
                            types: "get",
                            asyncs: false,
                            timeouts: 1000 * 10,
                            dataTypes: "json",
                            successes: function (datas) {
                                if (datas.res_code == -1) {
                                    window.location.href = "/cn/bindphones.html?" + window.location.pathname + window.location.search;
                                }
                            }
                        });
                        if(!!_this.url){
                            window.location.href =_this.url;
                        }
                        // console.log(data)
                    }
                },
                error:function(){
                    console.log('获取数据失败');
                }
            })
        },
        jumpUrl:function () {
            var _this=this;
            //我的中奖
            $('.my-prize').find('a').on('click',function () {
                _this.url='catchmoonmyprize.html';
                _this.sharePeopleLogin();
            });
            //提货更多
            $('.getgood-more').on('click',function () {
                _this.url='moongetgoodlist.html';
                _this.sharePeopleLogin();
            });
            //去抽奖
            $('.go-prize').on('click',function () {
                _this.url='catchmooncake_choujiang.html';
                _this.sharePeopleLogin();
            });
            //其他抽奖类型
            $('.other_prize').on('click',function () {
                _this.url='catchmoonothertype.html';
                _this.sharePeopleLogin();
            });
            //查看推荐明细
            $('.lookrecom').on('click',function () {
                _this.url='catchmoonrecomlist.html';
                _this.sharePeopleLogin();
            });
            //其他活动
            $('.rule-other-ac').on('click',function () {
                _this.url='catchmoonothertype.html';
                _this.sharePeopleLogin();
            });
            //我的中奖
            $('.rule-my-prize').on('click',function () {
                _this.url='catchmoonmyprize.html';
                _this.sharePeopleLogin();
            });


        },
        takeParentID:function(){
            $.ajax({
                url:publics+"shop/bettingMoonCake!initGame.do",
                type:'post',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:'json',
                success:function (data) {
                    if(data.res_code==1){
                        Ajax({
                            urls: "member/isBindMobile.action",
                            types: "get",
                            asyncs: false,
                            timeouts: 1000 * 10,
                            dataTypes: "json",
                            successes: function (datas) {
                                if (datas.res_code == -1) {
                                    window.location.href = "/cn/bindphones.html?" + window.location.pathname + window.location.search;
                                }
                            }
                        });
                        $('.catch-cake-num').html(data.res_data.all_count+'次');
                        $('.catch-people-score').html(data.res_data.all_score+'分');
                        $('.catch-people-num').html(data.res_data.own_rank);
                        $('.catch-prize-num').html(data.res_data.all_draw_count+'次');
                    }
                },
                error:function(){
                    console.log('获取数据失败');
                }
            })
        }

    };
    catchmooncake.init();



})();
