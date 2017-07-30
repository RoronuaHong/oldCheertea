var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/echo.js");
require("./common/touch");
var publics = "http://wx.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.21:8080/zxxt_qyy/";
}

var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// console.log(imgurl)

    var Diamond= function() {
    var _this = this;
    // this.newimgchange = new newimgChange();
    // this.swiperfun = new swiperFun();

    if(this instanceof Diamond) {

    } else {
        return new Diamond();
    }
};
Diamond.prototype = {
    init: function () {
        var _this=this;
        this.timer=null;
        $(document).ready(function () {
            function leftTimer(year,month,day,hour,minute,second){
                var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
                var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
                var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
                var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                days = checkTime(days);
                hours = checkTime(hours);
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                var now = new Date().getTime(); //当前时间
                var myTime = Date.parse("2017-07-20 17:30:00".replace(/-/g, "/"));
                if(now-myTime >=0) {
                    clearInterval( _this.timer);
                    days='00';
                    hours='00';
                    minutes='00';
                    seconds='00';
                }
                    $('.day').html(days);
                    $('.hours').html(hours);
                    $('.minutes').html(minutes);
                    $('.seconds').html(seconds);
            }
            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            _this.timer=setInterval(function () {
                leftTimer(2017,7,20,17,30,0);
            }, 1000);
        });
        return this;
    },
    querryPeople: function () {
        $.ajax({
            url: publics+"widget?type=group_lucky&action=listLuckDraw&startdate=2017-7-20",
            type: "get",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                var $joinPeople=$('.zhuan-people').find('ul');
                    $.each(data, function(i) {
                        if(!data[i].weixin_face) {
                            data[i].weixin_face = "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg";
                        }
                        var  times=new Date(data[i].add_time*1000);
                        var  Diamonds=new Diamond();
                        var  nowTime=Diamonds.formatDate(times);
                        $joinPeople.prepend(
                        "<li class='clearfix'>"+
                            "<div class='zhuan-people-left'>"+
                            "<img src='" + data[i].weixin_face + "'  alt='' />"+
                            "<p>"+'ID:'+"<span>"+ data[i].member_id+"</span>"+"</p>"+
                             "<strong>"+data[i].nickname+"</strong>"+
                         "</div>"+
                        "<div class='zhuan-people-right'>"+
                            "<span>"+nowTime+"</span>"+
                        "</div>"+
                        "</li>"
                        );
                    });
            },
            error: function (data) {
              alert('网络异常');
            }
        });
            return this;
    },
    formatDate: function (now) {
    var Diamonds=new Diamond();
    this.year= Diamonds.checkTime(now.getFullYear());
    this.month=Diamonds.checkTime(now.getMonth()+1);
    this.date=Diamonds.checkTime(now.getDate());
    this.our=Diamonds.checkTime(now.getHours());
    this.minute= Diamonds.checkTime(now.getMinutes());
    return this.year+"-"+this.month+"-"+this.date+" "+this.our+":"+this.minute;
     },
    checkTime: function(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
};
var Diamonds = new Diamond();
Diamonds.init().querryPeople();
