;(function() {
    var $ = require("./common/jquery.min");
    var Ajax = require("./function/ajax");
    require("./common/lCalendar.min");
    //共用头部
    var publics = "http://wx.cheertea.com/";
    if (window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if (window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var catchmoonguide= {
        init:function () {
            this.isLogin()
            this.arrowShake();
        },
        isLogin:function () {
            //登陆按钮点击事件
            var _this=this
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
                        if(!!parentId) {
                            var url="/cn/login.html?state="+parentId+"&forward=" + window.location.pathname;
                            window.location.href = url;
                        } else {
                            window.location.href = "/cn/login.html?forward=" + window.location.pathname;
                        }
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
                    }
                },
                error:function(){
                    console.log('获取数据失败');
                }
            })
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
        arrowShake:function () {
            var t=0,a=10,v=t*a,s=30,updown=true;
            setTimeout(jump,2);
            function jump() {
                if(t<=0){
                    updown=true;
                }else if(t*t*a>=s){
                    updown=false;
                }
                if(updown){
                    t=t+0.01
                }else{
                    t=t-0.01;
                }
            var top=(t*t*a)/($(window).width()/10)+1.75
                $('.arrow').css("bottom",top+"rem");// 设置图片的top值
                setTimeout(jump,2);
            }
        }
    }
    catchmoonguide.init()

})()