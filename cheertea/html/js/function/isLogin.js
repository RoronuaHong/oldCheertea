var $ = require("../common/zepto");
var Ajax = require("../function/ajax.js");

var isLogin = module.exports = {
    showFocus: function() {
        var _this = this;
        var datas = 0;
        //判断用户是否登录
        Ajax({
            urls: "member/login!isLogin.do",
            types: "get",
            asyncs: false,
            timeouts: 1000 * 10,
            dataTypes: "json",
            successes: function(data) {
                datas = JSON.parse(data);
                console.log(datas);
                if(datas.res_code == 0) {
                    //$("body").append(
                    //    "<div class='focusbox'>" +
                    //    "<div class='innerboxbg'></div>" +
                    //    "<div class='innerbox clearfix'>" +
                    //    "<p class='focustit'>" +
                    //    "您尚未登录，请<a href='../cn/login.html'>登录</a>" +
                    //    "</p>" +
                    //    "<span class='focubtn'>关注我们</span>" +
                    //    "</div>" +
                    //    "</div>"
                    //);
                    //if(datas.message == "会员未登录") {
                    //    window.location.href = "../cn/login.html";
                    //}
                } else if(datas.res_code == 1) {
                    //if(datas.member.subscribe == 0) {
                    //    $("body").append(
                    //        "<div class='focusbox'>" +
                    //        "<div class='innerboxbg'></div>" +
                    //        "<div class='innerbox clearfix'>" +
                    //        "<div class='innerlogbox'>" +
                    //        "<img src=" + imgchange.show(datas.member.weixin_face) + " alt='' class='roleimg'>" +
                    //        "<p class='newtext'><span calss='rolename'>" + datas.member.uname + "</span>,欢迎回来！</p>" +
                    //        "</div>" +
                    //        "<span class='focubtn'>关注我们</span>" +
                    //        "</div>" +
                    //        "</div>"
                    //    );
                    //
                }

                //点击关注
                $("body").on("touchstart", ".focubtn", function(event) {
                    event.preventDefault();
                    $("body").append(
                        "<div class='isDelete'>" +
                        "<img src='../qyy.png' alt='' class='qrimg'>" +
                        "</div>"
                    );

                    //修改img路径
                    $("body").find(".qrimg").attr("src", ($("body").find(".qrimg").attr("src")).replace("../", _this.imgurl));
                });
            },
            errors: function(data) {
                console.log(data);
            }
        });
        return datas.res_code;
    },
    showData: function() {
        Ajax({
            urls: "member/login!isLogin.do",
            types: "get",
            asyncs: false,
            timeouts: 1000 * 10,
            dataTypes: "json",
            successes: function(data) {
                datas = JSON.parse(data);
                console.log(datas);
            }
        });
        return datas;
    }
}