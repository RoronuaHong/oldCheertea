;(function() {
    var $ = require("./common/zepto");

    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var rule={
        init:function () {
                var how=this.isEarn('how');
                var _this=this;
                var title=$('head').find('title');
                if(how==1){
                    $('.catch-how-title-change').show();
                    $('.catch-how-ct-change').show();
                    title.html('马上获得博饼机会');
                    _this.goshare();

                }else if(how==2){
                    $('.catch-how-title-score').show();
                    $('.catch-how-ct-score').show();
                    title.html('马上提高博饼分');
                }

        },
        isEarn: function(name) {

            //正则判断URL是否存在当前
            var veg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substring(1).match(veg);
            if(r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        goshare:function () {
            var _this=this;
            $('.goshare').on('click',function () {
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
                        if(data.res_code == 0){
                            window.location.href = "/cn/login.html?forward=" + window.location.pathname;
                        }
                        if(data.res_code == 1) {
                            //微信分享
                            _this.shareWx(data.res_data.member.member_id)
                        }
                    },
                    error:function () {
                        console.log('网络出错')
                    }
                });
            })
        },
        shareWx: function(ids) {
            var url = location.href;
            var member_id = ids;
            var image_url = "http://images.cheertea.com/logonews.png";
            if(member_id != "" && member_id != undefined && member_id != null){
                var shareUrl =publics+'cn/catchmooncake.html?memberid=' + member_id;
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
                                desc:"缤纷豪礼送不停，更有价值数十万豪车等着你！",
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
                                desc:"缤纷豪礼送不停，更有价值数十万豪车等着你！",
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
                                desc:"缤纷豪礼送不停，更有价值数十万豪车等着你！",
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
                                desc:"缤纷豪礼送不停，更有价值数十万豪车等着你！",
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
        }
    }
    rule.init()
})()