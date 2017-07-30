;(function() {
    var $ = require("./common/jquery.min");
    var Ajax = require("./function/ajax.js");

    var freeDay = {
        dates: function() {

            Ajax({
                urls: "lucky/getLuckyDayList.action",
                types: "get",
                dataTypes: "json",
                successes: function (data) {
                    console.log(data);

                    var objArr = [];
                    var times = [];
                    var timesss = [];
                    var len = data.res_data.luckyDayList.length;

                    $.each(data.res_data.luckyDayList, function(i) {
                        var obj = {};

                        var timess = (data.res_data.luckyDayList[i].lucky_message).replace(/-/gi, "/");

                        obj["stamp"] = +new Date(timess + " 00:00");
                        obj["className"] = "able2";
                        timesss.push(+new Date(timess + " 00:00"));
                        objArr[i] = obj;
                    });

                    timesss.sort(function(a, b) {
                        return b - a;
                    });

                    console.log(timesss);

                    new Calendar({

                        // 用户传入实际的数据
                        container: 'container2',
                        angle: 14,
                        isMask: false, // 是否需要弹层
                        beginTime: [2017, 4, 1],//如空数组默认设置成1970年1月1日开始,数组的每一位分别是年月日。
                        endTime: [2020, 12, 31],//如空数组默认设置成次年12月31日,数组的每一位分别是年月日。
                        recentTime: [2017, data.res_data.luckyDayList[0].lucky_message.split("-")[1], 1],//如空数组默认设置成当月1日,数组的每一位分别是年月日。
                        isSundayFirst: true, // 周日是否要放在第一列
                        isShowNeighbor: true, // 是否展示相邻月份的月尾和月头
                        isToggleBtn: true, // 是否展示左右切换按钮
                        isChinese: true, // 是否是中文
                        monthType: 0, // 0:1月, 1:一月, 2:Jan, 3: April
                        canViewDisabled: false, // 是否可以阅读不在范围内的月份
                        beforeRenderArr: objArr,
                        success: function (item, arr) {

                        },
                        switchRender: function (year, month, cal) {
                            var data = objArr;
                            cal.renderCallbackArr(data);
                        }
                    });
                },
                errors: function(data) {
                    console.log(data);
                }
            });
        },
        init: function() {
            var _this = this;

            setTimeout(function() {

                //传入日历表格
                _this.dates();
            }, 200);
        }
    }

    freeDay.init();
})();
