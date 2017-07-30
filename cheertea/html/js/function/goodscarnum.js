var $ = require("../common/zepto");
var Ajax = require("../function/ajax");

var goodscarNum = module.exports = {
    showCarNum: function() {

        /* 实现底部购物车数字显示功能 */
        function ShowCarNumber() {
            Ajax({
                urls: "member/cart!getNum.do",
                types: "get",
                dataTypes: "json",
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    // 实现数字的隐藏和显示
                    if(datas.res_data) {
                        if(parseInt(datas.res_data.num) >= 1) {
                            $(".footerlab li").eq(2).find("em").html(datas.res_data.num);
                            $(".footerlab li").eq(2).find("em").show();
                        } else {
                            $(".footerlab li").eq(2).find("em").hide();
                        }
                    }
                }
            });
        }
        new ShowCarNumber();

        return this;
    }
}
