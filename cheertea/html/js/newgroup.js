;(function(win, doc) {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var islogins = require("./function/isLogin");
    var imgChange = require("./function/imgchange");
    var imgchange = new imgChange();

    if(window.location.host == "wx.cheertea.com") {
        imgurl = "http://images.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        imgurl = "http://images.cheertea.com/";
    } else {
        imgurl = "../images/";
    }

    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.21:8080/zxxt_qyy/";
    }

    var newGroup = {
        /*判断是否登录*/
        isLogin: function() {
            var islogin = islogins.showFocus();
            console.log(islogin);
            !islogin && (window.location.href = publics + "cn/login.html?forward=" + window.location.pathname + window.location.search);
        },
        /*获取ajax*/
        getAjax: function() {
            var _this = this;
            Ajax({
                urls: "getTogetherBuyList.action",
                dataTypes: "json",
                successes: function (data) {
                    var datas = data;
                    console.log(datas);
                    _this.appendLi(datas);
                }
            });
        },
        /*添加dom结构*/
        appendLi: function(datas) {
            var imgz = "http://images.cheertea.com/logobgs.png";

            $(".togethercontent").empty();
            $.each(datas.res_data.togetherBuyList, function(i) {
                !!datas.res_data.togetherBuyList[i].image && (imgz = imgchange.show(datas.res_data.togetherBuyList[i].image));
                $(".togethercontent").append(
                    '<div class="togetcon clearfix">' +
                        '<a href="/cn/togetherbuydetail.html?toid=' + datas.res_data.togetherBuyList[i].id + '">' +
                            '<div class="newimgbox clearfix">' +
                                '<img src="' + imgurl + '/logobgs.png" data-src="' + imgz + '">' +
                            '</div>' +
                            '<div class="rightcons clearfix">' +
                                '<p>' + datas.res_data.togetherBuyList[i].title + '</p>' +
                                '<div class="prizebox clearfix">' +
                                    '<div class="priceleftbox clearfix">' +
                                        '<span class="tail">' + datas.res_data.togetherBuyList[i].total + '人成团</span>' +
                                        '<span class="oldprice">￥<span class="opri">' + datas.res_data.togetherBuyList[i].price + '</span></span>' +
                                        '<span class="newprice">￥<span class="npri"><em>' + datas.res_data.togetherBuyList[i].tb_price + '</em></span></span>' +
                                    '</div>' +
                                    '<a href="/cn/togetherbuydetail.html?toid=' + datas.res_data.togetherBuyList[i].id + '" class="gobtn">去开团</a>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</div>'
                );
            });
        },
        /*实现拖拽效果*/
        newBuyDrag: function() {
            var diffX = 0;
            var diffY = 0;

            $(".newbuy").on("tap", function(event) {
                console.log(1);
                event.preventDefault();
                window.location.href = "/cn/togetherbuylist.html";
            });

            $(".newbuy").on("touchstart", function(event) {
                console.log(2);
                event.preventDefault();
                diffX = event.touches[0].clientX - event.target.offsetLeft;
                diffY = event.touches[0].clientY - event.target.offsetTop;
            });

            $(".newbuy").on("touchmove", function(event) {
                event.preventDefault();

                var difY = event.touches[0].clientY - diffY;
                var difX = event.touches[0].clientX - diffX;

                if(difY < 0) {
                    difY = 0;
                }

                if(difY + $(this).height() >= window.innerHeight) {
                    difY = window.innerHeight - $(this).height();
                }

                if(difX < 0) {
                    difX = 0;
                }

                if((difX + $(this).width()) > $(document).width()) {
                    difX = $(document).width() - $(this).width();
                }

                $(".newbuy").css({
                    // '-webkit-transform': 'translate(' + difX + 'px, ' + difY + 'px)',
                    // 'transform': 'translate(' + difX + 'px, ' + difY + 'px)'
                    top: difY + "px",
                    left: difX + "px"
                });

                $(".newbuy").on("touchend", function(event) {
                    event.preventDefault();
                });
            });
        },
        init: function() {

            //判断是否登录
            this.isLogin();

            //添加拼团信息
            this.getAjax();

            //实现拖拽效果
            this.newBuyDrag();
        }
    }
    newGroup.init();
})(window, document);
