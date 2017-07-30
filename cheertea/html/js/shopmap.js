;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var imgChange = require("./function/imgchange");

    require("./common/swiper-3.4.2.min");

    var imgchange = new imgChange();

    var shopMap = {
        /*输入框功能*/
        showDelete: function() {

            //输入字符，判断是否又字符
            $(".searchinput").on("input", function() {
                if(!!$(this).val()) {
                    $(".deletes").show();
                } else {
                    $(".deletes").hide();
                }
            });

            //删除输入框功能
            $(".deletes").on("touchend", function() {
                $(".searchinput").val("");
                $(this).hide();
            });
        },
        /*swipe效果*/
        swipFunc: function(lat, lng) {
            var _this = this;

            // this.swiper = new Swiper('#shoplist');
            this.mySwiper = new Swiper('#shoplist', {
                // autoplayDisableOnInteraction: false,
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                // loop: true,
                slidesPerView: 1,
                centeredSlides: true,
                // autoplay: 1000,
                observer: true,
                observeParents: true,
                onSlideChangeStart: function () {
                    console.log(_this.mySwiper.activeIndex)
                    _this.getCompanyAjax(5, lat, lng, _this.mySwiper.activeIndex);
                }
            });
        },
        /*实现地图功能*/
        newMap: function() {
            var _this = this;

            //初始化地图
            this.map = new BMap.Map("allmap");

            //获取当前位置
            this.locationPosition();

            //添加地图控件
            this.map.addControl(new BMap.NavigationControl());
            this.map.addControl(new BMap.OverviewMapControl());
            this.map.addControl(new BMap.ScaleControl());

            var geolocationControl = new BMap.GeolocationControl();
            geolocationControl.addEventListener("locationSuccess", function(e) {

                //拖拽地图的时候获取中心点的坐标
                //console.log(this.map.getCenter());
            });
            geolocationControl.addEventListener("locationError",function(e) {

                // 定位失败事件
                alert(e.message);
            });
            this.map.addControl(geolocationControl);
        },
        /*获取当前位置*/
        locationPosition: function(isShow) {
            var _this = this;

            //获取当前位置
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    _this.point = new BMap.Point(r.point.lng, r.point.lat);

                    setTimeout(function() {
                        _this.map.centerAndZoom(_this.point, 13);

                        _this.map.panTo(r.point.lng, r.point.lat);
                    }, 200);

                    //添加当前位置标记
                    var comIcon = new BMap.Icon(
                        "http://images.cheertea.com/baidumap.png",
                        new BMap.Size(22, 27),
                        {
                            offset: new BMap.Size(0, 0),
                            imageSize: new BMap.Size(80, 480),
                            // imageOffset: new BMap.Size(0.1, -27.5 * 12)
                            imageOffset: new BMap.Size(0.1, -27.5 * 13)
                        }
                    );

                    var comMarker = new BMap.Marker(_this.point, {icon: comIcon});
                    _this.map.addOverlay(comMarker);

                    //初始获取联盟商家位置
                    _this.getCompanyAjax(5, r.point.lat, r.point.lng, 0);

                    //实现swipe效果
                    _this.swipFunc(r.point.lat, r.point.lng);
                }
                else {
                    alert('failed'+this.getStatus());
                }
            }, {enableHighAccuracy: true});
        },
        /*给商家坐标添加颜色*/
        addMarker: function(newdata, num) {
            var _this = this;
            var markerArr = [];
            var pointArr = [];
            var iconArr = [];

            //清除所有覆盖物
            _this.map.clearOverlays();

            //绘制覆盖物
            $.each(newdata, function(i) {

                //蓝色覆盖物基本绘制
                iconArr[i] = new BMap.Icon(
                    "http://images.cheertea.com/baidumap.png",
                    new BMap.Size(22, 27),
                    {
                        offset: new BMap.Size(0, 0),
                        imageSize: new BMap.Size(80, 480),
                        imageOffset: new BMap.Size(-27.5, -27.5 * 13)
                    }
                );

                //红色覆盖物基本绘制
                iconArr[num] = new BMap.Icon(
                    "http://images.cheertea.com/baidumap.png",
                    new BMap.Size(25, 30),
                    {
                        offset: new BMap.Size(0, 0),
                        imageSize: new BMap.Size(92, 515),
                        imageOffset: new BMap.Size(0.1, -29.5 * 12)
                    }
                );

                if(newdata[i].com_lng && newdata[i].com_lng) {
                    pointArr[i] = new BMap.Point(newdata[i].com_lng, newdata[i].com_lat);
                    markerArr[i] = new BMap.Marker(pointArr[i], {icon: iconArr[i]});
                    _this.map.addOverlay(markerArr[i]);
                }

                //点击事件
                _this.addClickHandler(newdata, markerArr[i], i);
            });

            //添加当前位置标记
            var comIcon = new BMap.Icon(
                "http://images.cheertea.com/baidumap.png",
                new BMap.Size(22, 27),
                {
                    offset: new BMap.Size(0, 0),
                    imageSize: new BMap.Size(80, 480),
                    // imageOffset: new BMap.Size(0.1, -27.5 * 12)
                    imageOffset: new BMap.Size(0.1, -27.5 * 13)
                }
            );

            var comMarker = new BMap.Marker(_this.point, {icon: comIcon});
            _this.map.addOverlay(comMarker);
        },
        /*获取联盟商家的位置*/
        getCompanyAjax: function(radiuss, lat, lng, number) {
            var _this = this;

            Ajax({
                urls: "widget?type=baidumap&action=listNearby",
                types: "GET",
                dataTypes: "json",
                datas: {
                    latitude: lat,
                    longitude: lng,
                    radius: radiuss
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.code == 1) {

                        //获取sessionStorage的数据
                        var sessions = window.sessionStorage;
                        if(!sessions.getItem("business")) {

                            //获取当前坐标周边的店铺并添加覆盖物,默认第一个为红色指向
                            _this.addMarker(datas.data, number);

                            //添加DOM元素
                            _this.addTabCon(datas.data, number);

                            // //删除联盟商家列表
                            // sessions.removeItem("business");
                        } else {

                            //获取当前坐标周边的店铺并添加覆盖物,默认第一个为红色指向
                            _this.addMarker(JSON.parse(sessions.getItem("business")), number);

                            //添加DOM元素
                            console.log(JSON.parse(sessions.getItem("business")));
                            _this.addTabCon(JSON.parse(sessions.getItem("business")), number);

                            // //删除联盟商家列表
                            // sessions.removeItem("business");
                        }
                    }
                }
            });
        },
        /*填充至滑动位置*/
        addTabCon: function(datas) {
            $('.swiper-wrapper').empty();
            $.each(datas, function(i) {
                // var newsdistance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';
                var imgarr = [];

                imgarr[i] = datas[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas[i].com_image;

                $('.swiper-wrapper').append(
                    "<div class='swiper-slide'>" +
                        "<a href=newshoplist.html?ids=" + datas[i].com_id + ">" +
                            "<div class='arealistbox'>" +
                                "<div class='areali clearfix'>" +
                                    "<img src='" + imgchange.show(datas[i].com_image) + "' alt='' class='areaimg'>" +
                                    "<div class='rightbox clearfix'>" +
                                        "<div class='contexts'>" +
                                            "<div class='shopname'>" + datas[i].com_name + "</div>" +
                                            "<div class='intershop'>进入店铺 ></div>" +
                                        "</div>" +
                                        "<div class='detainandistance'>" +
                                            "<div class='detail'>" + datas[i].remark + "</div>" +
                                            "<div class='distance'>距离 <span class='dis'>" + datas[i].distance + "</span>千米</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</a>" +
                    "</div>"
                );
            });
        },
        /*地图配置*/
        mapConfig: function() {
            var _this = this;

            //初始化地图
            this.newMap();
        },
        /*实现点击事件*/
        addClickHandler: function(newdata, marker, indexs) {
            var _this = this;

            marker.addEventListener("click", function(e) {
                _this.addMarker(newdata, indexs);

                //实现滑动效果
                _this.mySwiper.slideTo(indexs);
            });
        },
        init: function() {

            //显示删除按钮
            this.showDelete();

            //地图配置
            this.mapConfig();

            $(document).ready(function() {
                $("html").css({
                    opacity: 1
                });
                $("body").css({
                    opacity: 1
                });
            });
        }
    }

    shopMap.init();
})();
