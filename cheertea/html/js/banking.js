;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var numericSpec = require("./function/NumericSpec");

    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = window.location.host;
    }

    var Banking = {
        numeric: function() {
            var number = numericSpec.init($(".price span").html());
            $(".price span").html(number);
        },
        getMoneyAjax: function() {
            var _this = this;
            Ajax({
                urls: "getMemberFinancialBalance.action",
                types: "get",
                dataTypes: "json",
                successes: function (data) {
                    console.log(data);

                    if(data.res_code == 0) {
                        window.location.href = publics + "cn/login.html?forward=" + window.location.pathname;
                    }

                    if(data.res_code == 1) {
                        $(".price span").html(data.res_data.financial_balance);
                    }

                    //千位分隔符
                    _this.numeric();
                }
            });
        },
        init: function() {
            this.getMoneyAjax();
        }
    }
    Banking.init();
})();
