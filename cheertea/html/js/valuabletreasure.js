;(function() {
    var $ = require("./common/jquery.min");

    var valuebleTreasure = {
        selLi: function() {
            $(".tabbox li").on("touchend", function() {
                $(this).addClass("lisel").siblings().removeClass("lisel");
                if($(this).index() == 0) {
                    $(".datebox").show();
                    $(".dateboxs").hide();
                } else {
                    $(".datebox").hide();
                    $(".dateboxs").show();
                }
            });
        },
        isDeleteFun: function() {

            //显示遮罩层
            $(".consultquickly").on("touchend", function() {
                $(".isDelete").show();
            });

            //取消遮罩层
            $(".cancelbtn").on("touchend", function(event) {
                event.preventDefault();
                $(".isDelete").hide();
            });
        },
        slide: function() {
            $(".nodetobuy").on("touchend", function() {
                $(this).siblings(".content").slideToggle();
                if($(this).hasClass("nodetobuyup")) {
                    $(this).removeClass("nodetobuyup");
                } else {
                    $(this).addClass("nodetobuyup");
                }
            });
        },
        init: function() {

            //下滑
            this.slide();

            //遮罩层操作
            this.isDeleteFun();

            //切换
            this.selLi();
        }
    }
    valuebleTreasure.init();
})();
