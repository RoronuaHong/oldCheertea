;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");

    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }

    var moonCake = {
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
        isEarn: function(name) {

            //正则判断URL是否存在当前
            var veg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substring(1).match(veg);
            if(r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        startAjax: function() {
            Ajax({
                urls: "shop/getGameCount.do",
                dataTypes: "json",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);
                    if(datas.res_code == 1) {
                        if(datas.res_data.all_count > 0) {
                            // $("#detailbox").hide();
                            // $("#detailboxmessage").show();
                            // $("#joiningbtn").hide();
                            $(".ownbox").show();
                            $(".noownbox").hide();
                            // $("#gamestartbtn").show();
                            $("#sharebtn").hide();
                            // $("#chance").find("span").html(datas.res_data.all_count);
                        } else if(datas.res_data.all_count == 0) {
                            // $("#detailbox").hide();
                            // $("#detailboxmessage").show();
                            // $("#joiningbtn").hide();
                            $(".ownbox").hide();
                            $(".noownbox").show();
                            $("#gamestartbtn").hide();
                            // $("#sharebtn").show();
                        }
                    }

                }
            });
        },
        detailboxAjax: function() {
            var _this = this;
            Ajax({
                urls: "shop/getGameCount.do?",
                dataTypes: "json",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.res_code == 1) {
                        if(datas.res_data.all_count > 0) {
                            $("#detailbox").hide();
                            $("#detailboxmessage").show();
                            $("#joiningbtn").hide();
                            $(".ownbox").show();
                            $(".noownbox").hide();
                            $("#gamestartbtn").show();
                            $("#sharebtn").hide();
                            $("#chance").find("span").html(datas.res_data.all_count);
                        } else if(datas.res_data.all_count == 0) {
                            $("#detailbox").hide();
                            $("#detailboxmessage").show();
                            $("#joiningbtn").hide();
                            $(".ownbox").hide();
                            $(".noownbox").show();
                            $("#gamestartbtn").hide();
                            $("#sharebtn").show();
                        }
                    }
                }
            });
        },
        showDetail: function() {
            $("#detailbtn").on("tap", function() {
                $("#details").show();
            });

            //点击取消
            $(".detailboxchacha").on("tap", function() {
                $("#details").hide();
            });

            //获取 巨柚博饼，大礼送不停   机会
            $("#sharebtn").on("tap", function() {
                $(".mooncakebettingwrap").hide();
                $(".sharemooncakewrap").show();
            });

            //分享好友
            $("#sharefriend").on("tap", function() {
                $("#shares").show();
            });
        },
        joinBtn: function() {
            var _this = this;

            $("#joiningbtn").on("tap", function() {
                _this.detailboxAjax();
                /*$("#detailbox").hide();
                $("#detailboxmessage").show();
                $(this).hide();
                $("#gamestartbtn").show();*/
                // $("#sharebtn").show();
            });
        },
        init: function() {
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
                        var parentId = _this.isEarn("memberid");
                        if(!!parentId) {
                            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb4868f50223328db&redirect_uri=http%3A%2F%2Fwx.cheertea.com%2Fmember_index.html"
                                +"&response_type=code"
                                +"&scope=snsapi_userinfo"
                                +"&state="+parentId+"#wechat_redirect";

                            window.location.href = url;
                        } else {
                            window.location.href = "cn/login.html?forward=" + window.location.pathname;
                        }
                    }
                    if(datas.res_code == 1) {
                        //微信分享
                        _this.shareWx(datas.res_data.member.member_id);
                    }
                }
            });

            //是否在挣机会页面
            if(this.isEarn("earn") == 1) {
                $(".mooncakebettingwrap").hide();
                $(".sharemooncakewrap").show();
            };

            //是否登录
            this.startAjax();

            //商品详情页
            this.showDetail();

            //我要参加按钮
            this.joinBtn();

            //阻止默认事件
            $(document).on("touchmove", function(event) {
                event.preventDefault();
            });
        }
    }

    moonCake.init();
})();