;(function() {
    var $ = require("./common/jquery.min");
    var getQueryString = require("./function/GetQueryString");

    var payResult = {
        isSuccess: function() {
            if(getQueryString.init("type") == 1) {
                $(".payresultwrapsuccess").hide();
                $(".payresultwrapfail").show();
                $(".repay").attr("href", getQueryString.init("forward") + window.location.search);
            }
        },
        init: function() {
            this.isSuccess();
        }
    }
    payResult.init();
})();