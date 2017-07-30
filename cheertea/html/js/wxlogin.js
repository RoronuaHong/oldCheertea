;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax.js");
    var getQueryString = require("./function/GetQueryString");

    var wxlogin = {
        init: function() {
            // console.log(getQueryString.init("code"));
            // console.log(getQueryString.init("state"));
            // alert(document.URL);
            // alert(getQueryString.init("code"));
            // alert(getQueryString.init("state"));
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
                    // alert(333);
                    // alert(window.sessionStorage.getItem("oldurl"));
                    window.location.href = window.sessionStorage.getItem("oldurl");
                }
            });
        }
    }
    wxlogin.init();
})();