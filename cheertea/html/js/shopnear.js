var $ = require("./common/zepto");
var Ajax = require("./function/ajax");
var imgChange = require("./function/imgchange");
var newimgChange = require('./function/newimgchange');
var isRemind = require("./function/isreminds");
var swiperFun = require("./function/swiperFun");
var isremind = new isRemind();

var imgchange = new imgChange();
var swiperfun = new swiperFun();
var newimgchange = new newimgChange();

require("./common/touch");

var shopNear = {
    init: function() {

        //滑动阻止默认事件
        $(".isDelete").on("touchstart", function(event) {
            event.preventDefault();
        });

        //实现轮播图
        //Ajax({
        //    urls: "type=new_index&ajax=yes&action=getData",
        //    types: "get",
        //    dataTypes: "json",
        //    successes: function (data) {
        //        var datas = JSON.parse(data);
        //        console.log(datas);
        //        swiperfun.showBanner(".newimgchangebox", datas.advList);
        //        newimgchange.loadBanner('#newimgchange', 3000, true, 1);
        //    }
        //});

        function showLocation() {

            //获取当前位置
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){

                    //实现列表页
                    Ajax({
                        urls: "widget?type=baidumap&action=listNearbyDistance",
                        types: "get",
                        dataTypes: "json",
                        datas: {
                            latitude: r.point.lat,
                            longitude: r.point.lng
                        },
                        beforeSends: function() {
                            $(".isDelete").show();
                            $(".loadingbox").show();
                        },
                        successes: function (data) {
                            var datas = JSON.parse(data);
                            console.log(datas);
                            var newstance = [];
                            $(".nearul").children().remove();
                            $.each(datas.data, function(i) {
                                newstance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';

                                var imgarr = [];
                                imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;
                                $(".nearul").append(
                                    "<li>" +
                                        "<a href='" + datas.data[i].shopUrl + "'>" +
                                    "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'>" +
                                    "<div class='otherbox'>" +
                                    "<p class='tit clearfix'>" +
                                    "<span class='big'>" + datas.data[i].com_name + "</span>" +
                                    "</p>" +
                                    "<div class='address clearfix'>" +
                                    "<span class='addre'>" + datas.data[i].com_address + "</span>" +
                                    "<span class='distance'>距离" + newstance[i] + "</span>" +
                                    "</div>" +
                                    "</div>" +
                                        "</a>" +
                                    "</li>"
                                );
                            });
                        },
                        completes: function() {
                            $(".isDelete").hide();
                            $(".loadingbox").hide();
                        }
                    });
                }
                else {
                    alert('failed'+this.getStatus());
                }
            }, {enableHighAccuracy: true});
        }
        showLocation();

        //点击重新定位并输出店铺
        $("h3").on("tap", function() {
            showLocation();
        });

        //点击叉叉
        $(".chacha").on("touchend", function(event) {
            event.preventDefault();
            $(".isDeletes").hide();
            $(".showShopbox").hide();
        });

        //防止页面
        $(".isDeletes").on("touchstart", function(event) {
            if(!$(event.target).parents().hasClass("smallshopbox")) {
                event.preventDefault();
            }
        });

        function showSmallLocation() {

            //获取当前位置
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){

                    //实现列表页
                    Ajax({
                        urls: "widget?type=baidumap&action=listNearbyDistance",
                        types: "get",
                        dataTypes: "json",
                        datas: {
                            latitude: r.point.lat,
                            longitude: r.point.lng
                        },
                        beforeSends: function() {
                            $(".isDelete").show();
                            $(".loadingbox").show();
                        },
                        successes: function (data) {
                            var datas = JSON.parse(data);
                            console.log(datas);
                            var newstance = [];
                            $(".smallshopul").children().remove();
                            $.each(datas.data, function(i) {
                                newstance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';

                                var imgarr = [];
                                imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;
                                $(".smallshopul").append(
                                    "<li class='clearfix'>" +
                                        "<a href=''>" +
                                            "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class=''>" +
                                            "<div class='otherbox'>" +
                                                "<p class='tit clearfix'>" +
                                                    "<span class='big'>" + datas.data[i].com_name + "</span>" +
                                                "</p>" +
                                                "<div class='address clearfix'>" +
                                                    "<span class='addre'>" + datas.data[i].com_address + "</span>" +
                                                    "<span class='distance'>距离" + newstance[i] + "</span>" +
                                                "</div>" +
                                            "</div>" +
                                        "</a>" +
                                    "</li>"
                                );
                            });
                        },
                        completes: function() {
                            $(".isDelete").hide();
                            $(".loadingbox").hide();
                        }
                    });
                }
                else {
                    alert('failed'+this.getStatus());
                }
            }, {enableHighAccuracy: true});
        }
        showSmallLocation();

        //小地图重新定位
        $(".reposition").on("tap", function() {
            showSmallLocation();
        });

        //设置4个的swiper
        // Ajax({
        //     url: "",
        //     dataType: "json",
        //     type: "get",
        //     data: {
        //
        //     },
        //     success: function(data) {
        //         console.log(data);
                 newimgchange.loadPath('#tradeareabox', true, 4);
                // var pathSwiper = new Swiper('#tradeareabox', {
                //     autoplayDisableOnInteraction: false,
                //     watchSlidesProgress: true,
                //     watchSlidesVisibility: true,
                //     loop: true,
                //     slidesPerView: 4
                // });
                // console.log(2)
        //     },
        //     error: function(data) {
        //         console.log(data);
        //     }
        // });

        return this;
    }
}
shopNear.init();
