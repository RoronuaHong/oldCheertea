;(function() {
    var $ = require("./common/jquery.min.js");
    //var urls = "http://192.168.2.24:8080/zxxt_qyy/";
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.21:8080/zxxt_qyy/";
    }

    var Choujiang = function() {
        if(this instanceof Choujiang) {

        } else {
            return new Choujiang();
        }
    };
    Choujiang.prototype = {
        init: function () {
            $.ajax({
                url:publics+"widget?type=group_lucky&action=resultLuckDraw",
                type: "get",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    var $ul=$('.zhuan-luck').find('ul');
                 if(!data.length){
                     $('.zhuan-warm').css({'display':'block'})
                 }else{
                     $.each(data,function (i) {
                         if(!data[i].weixin_face) {
                             data[i].weixin_face = "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg";
                         }
                         $ul.append(
                         "<li>" +
                         "<span>" +
                         "<img src='" + data[i].weixin_face + "' alt=''/>" +
                         "</span>" +
                         "<span class='names'>"+'ID:'+ data[i].member_id + "</span>" +
                         "<span class='adss'>" + data[i].nickname + "</span>" +
                         "</li>"
                         )
                     })
                 }
                },
                error: function (data) {
                    $('.zhuan-warm').css({'display':'block'});
                    alert('网络异常');
                }

            })
        }
    }

    var choujiang = new Choujiang();
    //写入相应的日期
    choujiang.init();
})();