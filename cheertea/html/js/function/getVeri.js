var $ = require("./common/zepto");
var Ajax = require("./function/ajax");
var Popup = require("./function/Popup");

var getVeri = module.exports = {
    /**
     *
     * @param ele   点击的元素
     * @param veg   正则
     * @param urls  路径
     * @param datas 数据
     * @param times 倒计时的时间
     * @param texts 弹出框的文本
     */
    init: function(ele, veg, urls, datas, times, texts) {
        var timer = 0;
        var _this = $(ele);
        var isClick = true;

        if(!!isClick) {
            isClick = false;
            if(veg.test(_this.val())) {

                // Ajax({
                //     urls: "",
                //     dataTypes: "json",
                //     types: "get",
                //     datas: datas,
                //     success: function(data) {
                //         console.log(data);
                //             var datas = JSON.parse(data);

                        //实现倒计时功能，并且按钮不能再次点击
                        timer = setInterval(function() {
                            times--;
                            if(times > 0) {
                                _this.html("重新验证(" + times + ")");
                            } else {
                                _this.html("重新验证");
                                clearInterval(timer);
                                isClick = true;
                            }
                        }, 1000);
                    // },
                    // error: function(data) {
                    //     console.log(data);
                    // }
                // });
            } else {
                Popup("alert", texts).show();
                isClick = true;
            }
        }
    }
}
