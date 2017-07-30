;(function() {
    var $ = require("./common/jquery.min.js");
    //var urls = "http://192.168.2.24:8080/zxxt_qyy/";
    //var urls = "http://wx.cheertea.com/";

    var urls = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        urls = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        urls = "http://wx.cheertea.com/";
    } else {
        urls = "http://192.168.2.24:8080/zxxt_qyy/";
    }

    var cjIndex = function() {
        if(this instanceof cjIndex) {
            this.timer = 0;

            this.eggBoolean = true;

            //复制一份蛋蛋
            $(".eggul").append($(".eggul").html());
        } else {
            return new cjIndex();
        }
    }
    cjIndex.prototype = {
        mouseMoves: function() {
            $(".cjindexwrap").on("mousemove", function(e) {

                //获取鼠标位置
                var xx = e.pageX;
                var yy = e.pageY;

                if(yy >= 700 && yy <= 850) {
                    $(".chuizi").css({
                       left:  xx + "px"
                    });
                }
                //console.log(yy);
            });
            return this;
        },
        eggMove: function() {
            var _this = this;

            //设置速度
            this.speed = 3;

            this.distance = 0;

            //点击蛋蛋运动
            $(".startbtn").on("click", function() {
                clearInterval(_this.timer);
                $(this).addClass("moves");
                $(".chuansongdaibox").addClass("zhuangdong");

                _this.timer = setInterval(function() {
                    _this.distance += _this.speed;

                    if(_this.distance >=  $(".eggbigbox").width() / 2) {
                        _this.distance = 0;
                    }

                    $(".eggbigbox").scrollLeft(_this.distance);
                }, 16);
            });
            return this;
        },
        chiziDo: function() {
            var _this = this;

            $(".eggul li").on("click", function() {
                if(_this.eggBoolean) {
                    if($(".startbtn").hasClass("moves")) {
                        _this.eggBoolean = false;
                        _this.thisEle = $(this);
                        clearInterval(_this.timer);
                        $(".chuansongdaibox").removeClass("zhuangdong");
                        $(".chuizi").addClass("chuiziDo");
                        $(".cjinnerbox .title span").html($(".jianglabbox .chou").html());

                        //数据交互
                        $.ajax({
                            url: urls + "widget?type=group_lucky&ajax=yes&action=luckyDrawReturn",
                            type: "get",
                            dataType: "json",
                            data: {
                                grade: $(".jianglabbox .chou").attr("idss")
                            },
                            beforeSend: function() {
                                var stimer = setTimeout(function () {
                                    $(".isDelete").stop().fadeIn();
                                    $(".loading").stop().fadeIn();
                                }, 600);
                            },
                            success: function(data) {
                                console.log(data);
                                $(".loading").stop().fadeOut();
                                if(data.result == 1) {
                                    $.each(data.data, function(i) {
                                        $(".memberbox").append(
                                            "<ul class='con clearfix'>" +
                                                "<li class='morder'>" + data.data[i].id + "</li>" +
                                                "<li class='mnumber'>" + data.data[i].groupId + "</li>" +
                                                "<li class='mmember'>" +

                                                "</li>" +
                                            "</ul>"
                                        );

                                        $.each(data.data[i].members, function(j) {
                                            //console.log(newarr);
                                            if(!data.data[i].members[j].weixin_face) {
                                                data.data[i].members[j].weixin_face = "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg";
                                            }
                                            $(".memberbox .con").eq(i).find(".mmember").append(
                                                "<div class='imgbox'>" +
                                                "<img src='" + data.data[i].members[j].weixin_face + "' alt='' class='mimg'/>" +
                                                "<span class='ids'>" + data.data[i].members[j].member_id + "</span>" +
                                                "</div>"
                                            );
                                        });
                                    });

                                    $(".choujianglistbox").stop().fadeIn();
                                } else if(data.result == 0) {
                                    $(".alertbox").stop().fadeIn(1000);
                                    $(".text").html(data.message);
                                }
                            },
                            error: function(data) {
                                console.log(data);
                            }
                        });

                        var timer = setTimeout(function () {
                            _this.thisEle.addClass("choice");
                            $(".chuizi").removeClass("chuiziDo");
                        }, 300);
                        //var stimer = setTimeout(function () {
                        //    $(".isDelete").stop().fadeIn();
                        //}, 600);
                    }
                }
            });
            return this;
        },
        showDraw: function() {
            var _this = this;

            //点击出现list
            $(".jianglabbox").on("click", function() {
                $(".cjlistbox").stop().fadeIn();
                $(this).addClass("ups");
            });

            //点击选择
            $(".cjlistbox li").on("click", function() {
                $(".jianglabbox .chou").html($(this).find("span").html());
                $(".cjlistbox").stop().fadeOut();
                $(".jianglabbox").removeClass("ups");
                $(".jianglabbox .chou").attr("idss", $(this).attr("idss"));
            });

            $(".chacha").on("click", function() {
                $(".isDelete").stop().fadeOut();
                $(".loading").stop().fadeOut();
                $(".choujianglistbox").stop().fadeOut();
                $(".startbtn").removeClass("moves");
                _this.thisEle.removeClass("choice");
                $(".memberbox").children().remove();
                _this.eggBoolean = true;
            });

            $(".newchacha").on("click", function() {
                $(".isDelete").stop().fadeOut();
                $(".loading").stop().fadeOut();
                $(".alertbox").stop().fadeOut();
                $(".startbtn").removeClass("moves");
                _this.thisEle.removeClass("choice");
                _this.eggBoolean = true;
            });
            return this;
        }
    }

    var cjindex = new cjIndex();
    cjindex.mouseMoves().eggMove().chiziDo().showDraw();
})();


