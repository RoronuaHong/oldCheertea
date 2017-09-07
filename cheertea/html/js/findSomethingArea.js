;(function(win, doc) {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var CommonRegExp = require("./function/CommonRegExp");

    var findSomethingArea = {
        /*获取排行榜*/
        getAjax: function() {
            var _this = this;

            Ajax({
                urls: "widget?type=find_someting&action=ranking_list",
                dataTypes: "json",
                types: "POST",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.result == 1) {
                        _this.setTopData(datas);
                        _this.setOtherData(datas);
                    }
                }
            })
        },
        setTopData: function(datas) {
            //二等奖
            $(".topThreebox li").eq(0).find("img").attr("src", datas.rankingList[1].weixinFace || "http://images.cheertea.com/logonews.png");
            $(".topThreebox li").eq(0).find(".name").html(datas.rankingList[1].uname);
            $(".topThreebox li").eq(0).find(".tel").html(CommonRegExp.telPhoneChange(datas.rankingList[1].mobile) || "无");

            //一等奖
            $(".topThreebox li").eq(1).find("img").attr("src", datas.rankingList[0].weixinFace || "http://images.cheertea.com/logonews.png");
            $(".topThreebox li").eq(1).find(".name").html(datas.rankingList[0].uname);
            $(".topThreebox li").eq(1).find(".tel").html(CommonRegExp.telPhoneChange(datas.rankingList[0].mobile) || "无");

            //三等奖
            $(".topThreebox li").eq(2).find("img").attr("src", datas.rankingList[2].weixinFace || "http://images.cheertea.com/logonews.png");
            $(".topThreebox li").eq(2).find(".name").html(datas.rankingList[2].uname);
            $(".topThreebox li").eq(2).find(".tel").html(CommonRegExp.telPhoneChange(datas.rankingList[2].mobile) || "无");
        },
        setOtherData: function(datas) {
            $.each(datas.rankingList, function(i) {
                if(i > 2) {
                    console.log(typeof i);
                    $(".rinkbox").append(
                        "<ul class='rinkul clearfix'>" +
                            "<li>" + (i + 1) + "</li>" +
                            "<li>" +
                                "<img src='" + (datas.rankingList[i].weixinFace || "http://images.cheertea.com/logonews.png") + "' alt='' class='liimgs'>" +
                            "</li>" +
                            "<li>" + datas.rankingList[i].uname + "</li>" +
                            "<li>" + (CommonRegExp.telPhoneChange(datas.rankingList[i].mobile) || "无") + "</li>" +
                        "</ul>"
                    )
                }
            });
        },
        /*获取邀请人数和剩余游戏次数*/
        getNewAjax: function() {
            Ajax({
                urls: "widget?type=find_someting&action=recommend_and_count",
                dataTypes: "json",
                types: "POST",
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);


                    !!(datas.result == -1) && (window.location.href = "/cn/login.html?forward=" + window.location.pathname + window.location.search);

                    if(datas.result == 1) {
                        $(".person").html(datas.recommend);
                        $(".num").html(datas.count);
                    }
                }
            });
        },
        wxShare: function(ids) {
            var url = location.href;
            var member_id = ids;
            var image_url = "http://images.cheertea.com/findsomethingicon.png";
            if(member_id != "" && member_id != undefined && member_id != null){
                var shareUrl = 'http://wx.cheertea.com/cn/findSomethingArea.html?memberid=' + member_id;
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
                                title: " 大家来找茬 ", // 分享标题
                                desc: " 眼力好就有大奖拿！这样的好事还等什么！", // 分享描述
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
                                title: " 大家来找茬 ", // 分享标题
                                desc: " 眼力好就有大奖拿！这样的好事还等什么！", // 分享描述
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
                                title: " 大家来找茬 ", // 分享标题
                                title: " 眼力好就有大奖拿！这样的好事还等什么！", // 分享描述
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
                                title: " 大家来找茬 ", // 分享标题
                                title: " 眼力好就有大奖拿！这样的好事还等什么！", // 分享描述
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
                });
            }
        },
        init: function() {

            //获取排行榜
            this.getAjax();
        }
    }
    findSomethingArea.init();
})(window, document);