require("../common/jquery.min2");
require("../common/mobiscroll");

var datetime = module.exports = function() {
    if(this instanceof datetime) {

    } else {
        return new datetime();
    }
}
datetime.prototype = {
    constructor: datetime,
    date_time: function() {
        //订餐日期选择
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear-10, //开始年份
            endYear: currYear + 20 //结束年份
        };
        // $(".book_time").mobiscroll($.extend(opt['date'], opt['default'])).time($.extend(opt['time'], opt['default']));       //只显示时间
        $(".book_time").mobiscroll($.extend(opt['date'], opt['default']));//只显示日期
        return this;
    }
}