var ajaxUrl = 'http://s.kuaixiaobang.top:8989/geekworld-interface/';
var ajaxKxbSupplierUrl = 'http://www.kxb168.com/web/';
var KxbSupplierUrl = 'http://www.kxb168.com/Views/';
var sevenMallHost = 'http://qlm.kxb168.com/';
var rootUrl = '/';
var promotionArr = ['买赠', '直降', '打折', '满赠', '满减', '满折', '组合'];

/*正式生产环境的配置*/
var product_ajaxUrl = 'http://wx.kxb168.com/geekworld-interface/';
var product_ajaxKxbSupplierUrl = 'http://www.kxb168.com/web/';
var product_KxbSupplierUrl = 'http://www.kxb168.com/Views/';
var product_rootUrl = '/';

/*demo环境的配置*/
var demo_ajaxUrl = 'http://wxdemo.kxb168.com/geekworld-interface/';
var demo_ajaxKxbSupplierUrl = 'http://demo.kuaixiaobang.top/web/';
var demo_KxbSupplierUrl = 'http://dm.kuaixiaobang.top/Views/';
var demo_rootUrl = '/';

if(/wx\.kxb168\.com/.test(window.location.host)){
    ajaxUrl = product_ajaxUrl;
    ajaxKxbSupplierUrl = product_ajaxKxbSupplierUrl;
    KxbSupplierUrl = product_KxbSupplierUrl;
    rootUrl = product_rootUrl;
} else if(/wxdemo\.kxb168\.com/.test(window.location.host)){
    ajaxUrl = demo_ajaxUrl;
    ajaxKxbSupplierUrl = demo_ajaxKxbSupplierUrl;
    KxbSupplierUrl = demo_KxbSupplierUrl;
    rootUrl = demo_rootUrl;
}

/*封装通用ajax*/
function ajax(settings, successFun) {
    var config = {
        dataType: "json",
        type: "get",
        // contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
            if (!data.success) {
                mui.toast(data.respMsg);
            } else {
                successFun && successFun.call(this, data);
            }
        },
        error: function() {
            mui.toast('数据请求失败！');
        }
    }

    $.ajax($.extend({}, config, settings));
}

/*获取url参数*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

/*手机号码更改验证码倒计时*/
function waitTime(waitId) {
    //设置再次发送时间
    var wait = 60;
    var _this = $(waitId);

    _this.html('重新发送(60)');
    _this.attr("disabled", true);
    var _res = setInterval(function() {
        wait -= 1;
        _this.html('重新发送(' + wait + ')');
        if (wait <= 0) {
            _this.removeAttr("disabled");
            _this.html('获取验证码');
            clearInterval(_res);
        }
    }, 1000);
}

/*判断用户是否登录*/
;
! function() {
    //白名单
    var whiteList = ['login.html', 'reset-password.html', 'register.html', 'profiles.html'];

    var isBreak = true;
    $.each(whiteList, function(index, elem) {
        if (window.location.pathname.indexOf(elem) > 0) {
            isBreak = false;
            return false;
        }
    })

    if (isBreak && !getCookie("mid")) {
        mui.openWindow({
            url: rootUrl + 'login.html'
        });
    } else {
        // if(!sessionStorage.getItem("店铺名称")){
        //     mui.openWindow({
        //         url: rootUrl + '完善资料页面.html'
        //     });
        // }
    }
}();

/*通用页面点击搜索跳到搜索页*/
$('#go-search').on('tap', function() {
    mui.openWindow({
        url: rootUrl + 'search.html'
    });
});

/*滚动组件*/
if ($('.mui-scroll-wrapper').length) {
    mui('.mui-scroll-wrapper').scroll();
}


/*根据评分返回星级*/
function grade(score, className) {
    var arr = score.split('.');
    var type = ['icon-star-half-less ' + className, 'icon-star-half ' + className, 'icon-star-half-more ' + className]
    var html = ""; //需要返回的html;

    if (arr.length != 2) {
        //循环空星
        for (var i = 0; i < 5 - parseInt(arr[0]); i++) {
            html += '<i class="icon-star-line ' + className + '"></i>';
        }
        return html;
    }

    //循环整星
    for (var i = 0; i < parseInt(arr[0]); i++) {
        html += '<i class="icon-star ' + className + '"></i>';
    }
    if (arr[1] != "0") {
        //判断当前星星
        html += '<i class="' + type[Math.ceil(parseInt(arr[1]) / 3) - 1] + '"></i>';

        //循环空星
        for (var i = 0; i < 4 - parseInt(arr[0]); i++) {
            html += '<i class="icon-star-line ' + className + '"></i>';
        }
    } else {
        //循环空星
        for (var i = 0; i < 5 - parseInt(arr[0]); i++) {
            html += '<i class="icon-star-line ' + className + '"></i>';
        }
    }
    return html;
}

//    退出登陆
$(function() {
    $("#logout").on("tap", function() {
        //sessionStorage.clear();
        delCookie("mid");
        try {
            ajax({
                url: ajaxKxbSupplierUrl + 'setting/Logout'
            }, function(data) {
                mui.openWindow({
                    url: rootUrl + "login.html"
                })
            })

        } catch (e) {
            mui.openWindow({
                url: rootUrl + "login.html"
            })
        }

    })
})


/*跑马灯效果*/
$.fn.extend({
    RollTitle: function(opt, callback) {
        if (!opt) var opt = {};
        var _this = this;
        _this.timer = null;
        _this.lineH = _this.find("li:first").css('z-index', '9').height();
        _this.line = opt.line ? parseInt(opt.line, 15) : parseInt(_this.height() / _this.lineH, 10);
        _this.speed = opt.speed ? parseInt(opt.speed, 10) : 3000, //卷动速度，数值越大，速度越慢（毫秒
            _this.timespan = opt.timespan ? parseInt(opt.timespan, 13) : 5000; //滚动的时间间隔（毫秒
        if (_this.line == 0) this.line = 1;
        _this.upHeight = 0 - _this.line * _this.lineH;
        _this.scrollUp = function() {
            _this.find("li:first").next().css('z-index', '8');
            _this.find("li:first").animate({
                marginTop: _this.upHeight
            }, _this.speed, function() {
                for (i = 1; i <= _this.line; i++) {
                    _this.find("li:first").removeAttr('style').appendTo(_this);
                    _this.find("li:first").css('z-index', '9');
                }
            });
        }
        _this.hover(function() {
            clearInterval(_this.timer);
        }, function() {
            _this.timer = setInterval(function() { _this.scrollUp(); }, _this.timespan);
        }).mouseout();
    }
})

//统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?91ce9c1cb56dbd667c30b7f0351a4baf";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

//监听返回
if ($('body').data('push-state') && location.hash != '#'+$('body').data('push-state')) {
    history.pushState({}, document.title, document.location.href + '#' + $('body').data('push-state'))
}