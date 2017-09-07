;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax.js");
    var getQueryString = require("./function/GetQueryString");

    var wxlogin = {
        init: function() {
            // console.log(getQueryString.init("code"));
            // console.log(getQueryString.init("state"));
            // alert(window.sessionStorage.getItem("oldurl"));
            // alert(getQueryString.init("code"));
            // alert(getQueryString.init("state"));
            //首页接口
            // Ajax({
            //     urls: "index/index!getIndexData.do",
            //     types: "get",
            //     dataTypes: "json",
            //     successes: function(data) {
            //         var datas = JSON.parse(data);
            //         console.log(datas);
            //         console.log(1);
            //     }
            // });
            Ajax({
                urls: "member/login!wxAuthCodeLogin.do",
                types: "get",
                asyncs: false,
                timeouts: 1000 * 10,
                dataTypes: "json",
                datas: {
                    code: getQueryString.init("code"),
                    state: getQueryString.init("state")
                },
                successes: function (data) {
                    Ajax({
                        urls: "member/isBindMobile.action",
                        types: "get",
                        asyncs: false,
                        timeouts: 1000 * 10,
                        dataTypes: "json",
                        successes: function (datas) {
                            if(datas.res_code == -1) {
                                window.location.href = "/cn/bindphones.html?" + window.sessionStorage.getItem("oldurl");
                            }

                            if(datas.res_code == 1) {
                                window.location.href = window.sessionStorage.getItem("oldurl");
                            }
                        }
                    });
                },
                errors: function(data) {
                    alert(data);
                    alert(window.sessionStorage.getItem("oldurl"));
                }
            });
            // console.log(1111);
        }
    }
    wxlogin.init();
})();