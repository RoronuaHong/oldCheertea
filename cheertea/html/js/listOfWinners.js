;(function(win, doc) {
    var $ = require("./common/jquery.min.js");
    var Ajax = require("./function/ajax");
    var TimestampUtil = require("./function/TimestampUtil");

    var listOfWonner = {
        daydayPrizeAjax: function() {
            Ajax({
                urls: "widget?type=find_someting&action=day_award",
                dataTypes: "json",
                types: "GET",
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.result == 1) {
                        $.each(datas.dayAwardList[0].data, function(i) {

                            //插入数据
                            $(".con").eq(0).append(
                                "<ul class='content clearfix'>" +
                                    "<li>" + datas.dayAwardList[0].data[i].find_month + "-" + datas.dayAwardList[0].data[i].find_day + "</li>" +
                                    "<li>" +
                                        "<img src='" + (datas.dayAwardList[0].data[i].weixin_face || "http://images.cheertea.com/logonews.png") + "' alt='' class='imgs'>" +
                                    "</li>" +
                                    "<li>" + datas.dayAwardList[0].data[i].uname + "</li>" +
                                    "<li>" + datas.dayAwardList[0].data[i].find_count + "</li>" +
                                "</ul>"
                            );
                        });
                    }
                }
            })
        },
        /*月月奖*/
        monmonPrizeAjax: function() {
            Ajax({
                urls: "widget?type=find_someting&action=month_award",
                dataTypes: "json",
                types: "GET",
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.result == 1) {
                        $.each(datas.monthAwardList, function(i) {
                            $(".con").eq(1).append(
                                "<div class='rankbox'>" +
                                    "<h3>" + datas.monthAwardList[i].findYear + "年" + datas.monthAwardList[i].findMonth + "月（排行榜）</h3>" +
                                    "<ul class='contitle clearfix'>" +
                                        "<li>时间</li>" +
                                        "<li>头像</li>" +
                                        "<li>昵称</li>" +
                                        "<li>找茬个数</li>" +
                                    "</ul>" +
                                "</div>"
                            );

                            $.each(datas.monthAwardList[i].monthAwardItemList, function(j) {
                                $(".rankbox").eq(i).append(
                                    "<ul class='content clearfix'>" +
                                        "<li>" + datas.monthAwardList[i].monthAwardItemList[j].find_month + "-" + datas.monthAwardList[i].monthAwardItemList[j].find_day + "</li>" +
                                        "<li>" +
                                            "<img src='" + (datas.monthAwardList[i].monthAwardItemList[j].weixin_face || "http://images.cheertea.com/logonews.png") + "' alt='' class='imgs'>" +
                                        "</li>" +
                                        "<li>" + datas.monthAwardList[i].monthAwardItemList[j].uname + "</li>" +
                                        "<li>" + datas.monthAwardList[i].monthAwardItemList[j].find_count　+　"</li>" +
                                    "</ul>"
                                );
                            });
                        });
                    }
                }
            });
        },
        /*实现tab切换*/
        showTab: function() {
            $(".listtabbox li").on("click", function() {
                $(this).addClass("lisel").siblings().removeClass("lisel");
                $(".conbox .con").eq($(this).index()).show().siblings(".con").hide();
            });
        },
        init: function() {

            /*实现tab切换*/
            this.showTab();

            /*日日奖*/
            this.daydayPrizeAjax();

            /*月月奖*/
            this.monmonPrizeAjax();
        }
    }
    listOfWonner.init();
})(window, document);