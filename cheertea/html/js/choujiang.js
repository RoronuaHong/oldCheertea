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
            // this.length = $(".innerbox li").length;

            //将内容复制一份
            // $(".innerbox").append($(".innerbox").html());

        } else {
            return new Choujiang();
        }
    }
    Choujiang.prototype = {
        init: function() {
            var $ul= $('.get-people').find('ul');
            var $choujiangBtn=$('.choujiang-btn');

            var _this=this;
            this.onOff=true;
            this.timer=null;
            this.$liH=0;
            this.dataLen=0;
            $choujiangBtn.on('click',function () {
                if(_this.onOff){
                    //向服务器发球请求
                    $.ajax({
                        url: publics+"widget?type=group_lucky&action=listLuckDraw&startdate=2017-7-20",
                        type: "get",
                        dataType: "json",
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (data) {
                            var index=0;
                            var $scroll=0;
                            _this.dataLen=data.length;
                            _this.onOff=false;
                            $ul.css({'top':0});
                            $ul.html('');
                            $choujiangBtn.attr({'src':'http://images.cheertea.com/choujiangbtn2-v201707.png'});
                            //页面渲染
                            while (index<2){
                                $.each(data, function(i) {
                                    if(!data[i].weixin_face) {
                                        data[i].weixin_face = "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg";
                                    }
                                    var tels=!!data[i].ship_mobile && (data[i].ship_mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                    $ul.append(
                                        "<li>" +
                                        "<span>" +
                                        "<img src='" + data[i].weixin_face + "' alt=''/>" +
                                        "</span>" +
                                        "<span class='names'>" + data[i].nickname + "</span>" +
                                        "<span class='adss'>" + tels + "</span>" +
                                        "</li>"
                                    );
                                });
                                index++;
                            }
                            var $li=$('.get-people').find('li').eq(0).get(0);
                            //获取页面高度
                            _this.$liH=parseFloat($li.currentStyle ? $li.currentStyle : window.getComputedStyle($li, null).height);
                            //开启滚动
                            _this.timer=setInterval(function () {
                                    $scroll+=_this.$liH;
                                    if($scroll >=  _this.dataLen*_this.$liH) {
                                        $scroll = 0;
                                    }
                                    $ul.animate({'top':-$scroll},50)
                            },50);
                        },
                        error: function (data) {

                            alert('网络异常');
                        }
                    });
                }else {
                    //获取中奖数据
                    $.ajax({
                        url:publics+"widget?type=group_lucky&action=luckDraw",
                        type: "get",
                        dataType: "json",
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        success:function (data) {
                            clearInterval(_this.timer);
                            // var $king=parseInt(Math.random()* _this.dataLen);
                            $ul.css({top:0});
                            $ul.animate({"top":-_this.$liH*data[0].index},100,function (){
                                $('.choujiang-btn').attr({'src':'http://images.cheertea.com/choujiangbtn1-v201707.png'});
                                _this.onOff=true;
                            });
                        },
                        error: function (data) {
                            alert('网络异常');
                        }
                    })

                }
            });

        }

}

    var choujiang = new Choujiang();
    //写入相应的日期
    choujiang.init();
})();