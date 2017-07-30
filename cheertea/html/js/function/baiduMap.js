;(function() {
    var $ = require("../common/zepto");
    var Ajax = require("../function/ajax");
    var imgChange = require("../function/imgchange");
    var isRemind = require("../function/isreminds");

    var isremind = new isRemind();
    var imgchange = new imgChange();

    //是否是第一次点击
    var isFirst = true;

    require("../common/touch");

    var baiduMap = module.exports = {
        init: function() {
            var _this = this;
            var newstance = [];
            var markerArrs = [];
            var pointArrs = [];
            var iconArrs = [];

            this.map = new BMap.Map("allmap");
            this.map.addControl(new BMap.NavigationControl());
            this.map.addControl(new BMap.OverviewMapControl());
            this.map.addControl(new BMap.ScaleControl());

            /*定位公司地址*/
            function comPoistion() {

                //公司覆盖物
                var comIcon = new BMap.Icon(
                    "http://images.cheertea.com/baidumap.png",
                    new BMap.Size(22, 27),
                    {
                        offset: new BMap.Size(0, 0),
                        imageSize: new BMap.Size(80, 480),
                        imageOffset: new BMap.Size(0.1, -27.5 * 12)
                    }
                );

                var comPoint = new BMap.Point(118.201271, 24.498624);
                var comMarker = new BMap.Marker(comPoint, {icon: comIcon});
                _this.map.addOverlay(comMarker);
            }
            comPoistion();

            //点击实现小图
            $(".downarrow").on("touchend", function(event) {
                event.preventDefault();
                $(".bigsearchbox").hide();
                $(".chengaddressbox").hide();
                $(".nearbytwo").hide();
                $(".nearbyone").show();
            });

            this.mySwiper = new Swiper('#baiducon', {
                autoplayDisableOnInteraction: false,
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                slidesPerView: 1.1,
                centeredSlides: true,
                observer: true,
                observeParents: true,
                onSlideChangeStart: function () {
                    getAjax(5, _this.map.getCenter().lat, _this.map.getCenter().lng, _this.mySwiper.activeIndex);
                }
            });

            //添加点击事件
            function addClickHandler(newdata, marker, indexs) {
                marker.addEventListener("click", function(e) {
                    addMarker(newdata, indexs);

                    //实现滑动效果
                    _this.mySwiper.slideTo(indexs);
                });
            }

            //获取当前坐标周边的店铺并添加覆盖物函数
            function addMarker(newdata, num) {
                var markerArr = [];
                var pointArr = [];
                var iconArr = [];

                //清除所有覆盖物
                _this.map.clearOverlays();
                comPoistion();

                //绘制覆盖物
                $.each(newdata, function(i) {
                    if(i < 5) {

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

                        if (newdata[i].com_lng && newdata[i].com_lng) {
                            pointArr[i] = new BMap.Point(newdata[i].com_lng, newdata[i].com_lat);
                            markerArr[i] = new BMap.Marker(pointArr[i], {icon: iconArr[i]});
                            _this.map.addOverlay(markerArr[i]);

                            //点击事件
                            addClickHandler(newdata, markerArr[i], i);
                        }
                    }
                });
            }

            //ajax添加覆盖物
            function getAjax(radiuss, lat, lng, number) {
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

                        if(datas.code == 1) {

                            //获取当前坐标周边的店铺并添加覆盖物,默认第一个为红色指向
                            addMarker(datas.data, number);
                            //_this.mySwiper.slideTo(number);

                            //插入数据
                            $('.swiper-wrapper').children().remove();
                            $.each(datas.data, function(i) {
                                if(i < 5) {
                                    newstance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';
                                    var imgarr = [];

                                    imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;

                                    $('.swiper-wrapper').append(
                                        "<div class='swiper-slide' ids='" + datas.data[i].com_id + "' indexs='" + i + "'>" +
                                        "<a href='" + datas.data[i].shopUrl + "'>" +
                                        "<div class='conbox clearfix'>" +
                                        "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'/>" +
                                        "<div class='otherbox'>" +
                                        "<p class='tit clearfix'>" +
                                        "<span class='big'>" + datas.data[i].com_name + "</span>" +
                                        "</p>" +
                                        "<div class='address clearfix'>" +
                                        "<span class='addre'>" + datas.data[i].com_address + "</span>" +
                                        "<span class='distance'>距您" + newstance[i] + "</span>" +
                                        "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        "</a>" +
                                        "</div>"
                                    );
                                }
                            });

                            //插入显示更多
                            $('.swiper-wrapper').append(
                                "<div class='swiper-slide'>" +
                                    "<div class='conbox clearfix newconbox'>" +
                                        "<p class='texts'>点击查看更多店铺</p>" +
                                        "<div class='chakanbtn'>点击查看</div>" +
                                    "</div>" +
                                "</div>"
                            );

                            //实现返回当前位置的功能
                            $(".chakanbtn").on("touchend", function(event) {
                                event.preventDefault();
                                $(".nearbytwo").hide();
                                $(".nearbyone").show();
                                isFirst = false;
                                _this.maps.clearOverlays();

                                console.log(_this.map.getCenter().lng, _this.map.getCenter().lat)

                                //重置地址
                                var myicon = new BMap.Icon(
                                    "http://images.cheertea.com/baidumap.png",
                                    new BMap.Size(22, 27),
                                    {
                                        offset: new BMap.Size(0, 0),
                                        imageSize: new BMap.Size(80, 480),
                                        imageOffset: new BMap.Size(0.1, -29.8 * 12)
                                    }
                                );

                                var aaapoint = new BMap.Point(_this.map.getCenter().lng, _this.map.getCenter().lat);
                                var marker = new BMap.Marker(aaapoint, {icon: myicon});
                                _this.maps.addOverlay(marker);

                                //console.log(r.point.lng, r.point.lat)
                                setTimeout(function() {
                                    _this.maps.centerAndZoom(aaapoint, 100);
                                }, 100);

                                //重新设置店铺
                                Ajax({
                                    urls: "widget?type=baidumap&action=listNearbyDistance",
                                    types: "GET",
                                    dataTypes: "json",
                                    datas: {
                                        latitude: _this.map.getCenter().lat,
                                        longitude: _this.map.getCenter().lng
                                    },
                                    successes: function (data) {
                                        var datas = JSON.parse(data);
                                        console.log(datas);
                                        if(datas.code == 1) {

                                            //获取当前坐标周边的店铺并添加覆盖物
                                            addMarker(datas.data);

                                            var newsdistances = [];
                                            //解析地址
                                            var geoc = new BMap.Geocoder();
                                            geoc.getLocation(aaapoint, function(rs){
                                                var addComp = rs.addressComponents;
                                                $(".messagebox").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
                                            });

                                            //获取数据
                                            $('.goodlistbox .innerbox').children().remove();
                                            $.each(datas.data, function(i) {

                                                //蓝色覆盖物基本绘制
                                                iconArrs[i] = new BMap.Icon(
                                                    "http://images.cheertea.com/baidumap.png",
                                                    new BMap.Size(22, 27),
                                                    {
                                                        offset: new BMap.Size(0, 0),
                                                        imageSize: new BMap.Size(80, 480),
                                                        imageOffset: new BMap.Size(-27.5, -27.5 * 13)
                                                    }
                                                );

                                                if(datas.data[i].com_lng && datas.data[i].com_lng) {
                                                    pointArrs[i] = new BMap.Point(datas.data[i].com_lng, datas.data[i].com_lat);
                                                    markerArrs[i] = new BMap.Marker(pointArrs[i], {icon: iconArrs[i]});
                                                    _this.maps.addOverlay(markerArrs[i]);
                                                }

                                                newsdistances[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';

                                                var imgarr = [];
                                                imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;
                                                $('.goodlistbox .innerbox').append(
                                                    "<a href='" + datas.data[i].shopUrl + "'>" +
                                                    "<div class='conbox clearfix'>" +
                                                    "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'/>" +
                                                    "<div class='otherbox'>" +
                                                    "<p class='tit clearfix'>" +
                                                    "<span class='big'>" + datas.data[i].com_name + "</span>" +
                                                    "</p>" +
                                                    "<div class='address clearfix'>" +
                                                    "<span class='addre'>" + datas.data[i].com_address + "</span>" +
                                                    "<span class='distance'>距您" + newsdistances[i] + "</span>" +
                                                    "</div>" +
                                                    "</div>" +
                                                    "</div>" +
                                                    "</a>"
                                                );
                                            });
                                        }
                                    }
                                });
                                _this.mySwiper.slideTo(0);
                            });
                        }
                    }
                });
            }

            //获取当前坐标位置
            getAjax(5, this.map.getCenter().lat, this.map.getCenter().lng, 0);

            //添加定位控件
            var geolocationControl = new BMap.GeolocationControl();
            geolocationControl.addEventListener("locationSuccess", function(e) {

                //拖拽地图的时候获取中心点的坐标
                //console.log(this.map.getCenter());
            });
            geolocationControl.addEventListener("locationError",function(e) {

                // 定位失败事件
                alert(e.message);
            });

            _this.map.addEventListener("zoomend", function() {

                //拖拽地图的时候获取中心点的坐标
                _this.map.clearOverlays();
                comPoistion();
                getAjax(5, _this.map.getCenter().lat, _this.map.getCenter().lng, 0);
                console.log(_this.maps.getCenter().lng, _this.maps.getCenter().lat)
                //console.log(map.getCenter());
            }, false);

            _this.map.addEventListener("moveend", function(event) {

                //拖拽地图的时候获取中心点的坐标
                _this.map.clearOverlays();
                comPoistion();
                getAjax(5, _this.map.getCenter().lat, _this.map.getCenter().lng, 0);
                _this.map.panTo(this.getCenter().lat, this.getCenter().lng);
                console.log(_this.maps.getCenter().lat, _this.maps.getCenter().lng)
            }, false);

            _this.map.addControl(geolocationControl);

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    this.point = new BMap.Point(r.point.lng, r.point.lat);
                    _this.map.centerAndZoom(this.point, 100);
                    _this.map.panTo(r.point.lng, r.point.lat);
                }
                else {
                    alert('failed'+this.getStatus());
                }
            }, {enableHighAccuracy: true});

            return this;
        },
        nearbyOne: function() {

            var _this = this;
            var newsdistance = [];
            this.maps = new BMap.Map("nearbyslim");
            this.maps.disableDragging();
            this.maps.disableScrollWheelZoom();
            //this.maps.addControl(new BMap.NavigationControl());
            //this.maps.addControl(new BMap.OverviewMapControl());
            //this.maps.addControl(new BMap.ScaleControl());

            /*定位公司地址*/
            function comPoistion() {

                //公司覆盖物
                var comIcon = new BMap.Icon(
                    "http://images.cheertea.com/baidumap.png",
                    new BMap.Size(22, 27),
                    {
                        offset: new BMap.Size(0, 0),
                        imageSize: new BMap.Size(80, 480),
                        imageOffset: new BMap.Size(0.1, -29.5 * 12)
                    }
                );

                var comPoint = new BMap.Point(118.201271, 24.498624);
                var comMarker = new BMap.Marker(comPoint, {icon: comIcon});
                _this.maps.addOverlay(comMarker);
            }
            comPoistion();

            //点击显示大地图
            $(".uparrow").on("touchend", function(event) {
                event.preventDefault();
                $(".bigsearchbox").hide();
                $(".chengaddressbox").hide();
                $(".nearbytwo").show();
                $(".nearbyone").hide();
                setTimeout(function() {
                    _this.map.centerAndZoom(_this.point, 100);
                }, 100);
            });

            //获取当前坐标周边的店铺并添加覆盖物函数
            function addMarker(newdata, num) {
                var markerArr = [];
                var pointArr = [];
                var iconArr = [];

                //清除所有覆盖物
                _this.maps.clearOverlays();
                comPoistion();

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

                    if(newdata[i].com_lng && newdata[i].com_lng) {
                        pointArr[i] = new BMap.Point(newdata[i].com_lng, newdata[i].com_lat);
                        markerArr[i] = new BMap.Marker(pointArr[i], {icon: iconArr[i]});
                        _this.maps.addOverlay(markerArr[i]);
                    }
                });
            }

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                if(this.getStatus() == BMAP_STATUS_SUCCESS) {

                    Ajax({
                        urls: "widget?type=baidumap&action=listNearbyDistance",
                        types: "GET",
                        dataTypes: "json",
                        datas: {
                            latitude: r.point.lat,
                            longitude: r.point.lng
                        },
                        successes: function (data) {
                            var datas = JSON.parse(data);

                            if(datas.code == 1) {

                                //获取当前坐标周边的店铺并添加覆盖物
                                addMarker(datas.data);

                                //获取起始点的坐标，并且添加覆盖物
                                var mypoint = new BMap.Point(r.point.lng, r.point.lat);
                                myicon = new BMap.Icon(
                                    "http://images.cheertea.com/baidumap.png",
                                    new BMap.Size(22, 27),
                                    {
                                        offset: new BMap.Size(0, 0),
                                        imageSize: new BMap.Size(80, 480),
                                        imageOffset: new BMap.Size(0.1, -29.8 * 12)
                                    }
                                );

                                var marker = new BMap.Marker(mypoint, {icon: myicon});
                                _this.maps.addOverlay(marker);
                                var point = new BMap.Point(r.point.lng, r.point.lat);
                                //console.log(r.point.lng, r.point.lat)
                                _this.maps.centerAndZoom(point, 100);
                                //map.panTo(r.point.lng, r.point.lat);

                                //解析地址
                                var geoc = new BMap.Geocoder();
                                geoc.getLocation(r.point, function(rs){
                                    var addComp = rs.addressComponents;
                                    $(".messagebox").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
                                });

                                //获取数据
                                $('.goodlistbox .innerbox').children().remove();
                                $.each(datas.data, function(i) {
                                    newsdistance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';
                                    var imgarr = [];

                                    imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;

                                    $('.goodlistbox .innerbox').append(
                                        "<a href='" + datas.data[i].shopUrl + "'>" +
                                            "<div class='conbox clearfix'>" +
                                                "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'/>" +
                                                "<div class='otherbox'>" +
                                                    "<p class='tit clearfix'>" +
                                                        "<span class='big'>" + datas.data[i].com_name + "</span>" +
                                                    "</p>" +
                                                    "<div class='address clearfix'>" +
                                                        "<span class='addre'>" + datas.data[i].com_address + "</span>" +
                                                        "<span class='distance'>距您" + newsdistance[i] + "</span>" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</a>"
                                    );
                                });
                            }
                        }
                    });
                }
                else {
                    alert('failed'+this.getStatus());
                }
            }, {enableHighAccuracy: true});

            //添加点击事件
            this.maps.addEventListener("click", function() {
                istrue = true;
                $(".nearbyone").hide();
                $(".nearbytwo").show();

                if(isFirst) {
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            var point = new BMap.Point(r.point.lng, r.point.lat);
                            _this.map.centerAndZoom(point, 100);
                            _this.map.panTo(r.point.lng, r.point.lat);
                        }
                        else {
                            alert('failed'+this.getStatus());
                        }
                    }, {enableHighAccuracy: true});
                }
            });

            //判断后退按钮
            $(".backs").on("touchend", function(event) {
                event.preventDefault();
                if($(".nearbytwo").css("display") == "block" || $(".chengaddressbox").css("display") == "block" || $(".bigsearchbox").css("display") == "block") {
                    $(".bigsearchbox").hide();
                    $(".chengaddressbox").hide();
                    $(".nearbytwo").hide();
                    $(".nearbyone").show();
                } else {
                    window.history.go(-1);
                }
            });

            return this;
        },
        searchfun: function() {
            var _this = this;

            //设置数据
            var ls = window.localStorage;
            var arr = [];

            function getLocalStorage() {

                //获取历史记录
                newarr = ls.getItem("arrs");
                $(".historybox").children().remove();
                if(newarr) {
                    var newArrs = newarr.split(",");
                    $(".bighisbox").show();

                    $.each(newArrs, function(i) {
                        $(".historybox").prepend(
                            "<li>" + newArrs[i] + "</li>"
                        );
                    });
                } else {
                    $(".bighisbox").hide();
                }

                $(".historybox li").on("tap", function() {
                    $(".inputs").val($(this).html());
                });
            }

            $(".searchbox").on("touchend", function(event) {
                $(".bigsearchbox").show();
                $(".chengaddressbox").hide();
                $(".nearbyone").hide();
                $(".nearbytwo").hide();
                _this.mySwiper.slideTo(0);
                getLocalStorage();
            });

            //清空数据
            $(".bighisbox .clearbtn").on("tap", function() {
                $(".bighisbox").hide();
                ls.clear();
                arr.splice(0, arr.length);
                $(".historybox").children().remove();
            });

            $(".cancelbtn").on("tap", function(event) {
                $(".bighisbox").show();
                $(".resultsul").hide();
                $(".inputs").val("");
            });

            //点击搜索
            $(".btnsear").on("touchend", function(event) {
                if(ls.getItem("arrs")) {
                    for(var i = 0; i < (ls.getItem("arrs").split(",")).length; i++) {
                        arr[i] = (ls.getItem("arrs").split(","))[i];
                    }
                }

                if($(".inputs").val()) {
                    if(arr.length) {
                        var boolean = false;
                        for(var i = 0; i < arr.length; i++) {
                            if(arr[i] == $(".inputs").val()) {
                                boolean = true;
                                arr.splice(i, 1);
                                arr.push($(".inputs").val());
                            }
                        }
                        if(!boolean) {
                            arr.push($(".inputs").val());
                        }
                    } else {
                        arr.push($(".inputs").val());
                    }

                    ls.setItem("arrs", arr);

                    getLocalStorage();

                    //ajax数据交互
                    Ajax({
                        urls: "widget?type=baidumap&action=searchShop",
                        types: "POST",
                        dataTypes: "json",
                        datas: {
                            shopName: $(".inputs").val()
                        },
                        successes: function(data) {
                            var datas = JSON.parse(data);
                            console.log(datas);
                            $(".resultsul").children().remove();

                            if(!!datas.data.length) {
                                $(".bighisbox").hide();
                                $.each(datas.data, function(i) {
                                    if (datas.data[i].com_lng && datas.data[i].com_lat) {
                                        $(".resultsul").append(
                                            "<li>" + datas.data[i].com_name + "</li>"
                                        );

                                        $(".resultsul li").on("touchend", function (event) {
                                            var indexs = $(this).index();
                                            $(".bigsearchbox").hide();
                                            $(".resultsul").hide();
                                            $(".nearbytwo").show();
                                            var indexs = $(this).index();

                                            setTimeout(function () {

                                                //将地址显示出来
                                                var points = new BMap.Point(datas.data[indexs].com_lng, datas.data[indexs].com_lat);
                                                _this.map.centerAndZoom(points, 100);
                                                _this.map.panTo(datas.data[indexs].com_lng, datas.data[indexs].com_lat);
                                                console.log(datas.data[indexs].com_lng, datas.data[indexs].com_lat);
                                            }, 100);
                                        });
                                    }
                                });
                                $(".resultsul").show();
                            } else {
                                $(".resultsul").hide();
                                $(".bighisbox").show();
                                isremind.showIsmind(".isremindsbox", "店铺不存在，请重新输入");
                            }
                        },
                    });
                } else {
                    isremind.showIsmind(".isremindsbox", "请输入店铺");
                }
            });

            return this;
        },
        changeAddress: function() {
            var _this = this;
            var addArr = [];
            var addnewArrs = [];
            var addls = window.localStorage;

            //获取定位的位置
            function getPosition() {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS) {

                        //console.log(r.point);
                        var geoc = new BMap.Geocoder();
                        geoc.getLocation(r.point, function(rs) {
                            var addComp = rs.addressComponents;
                            $(".addretext").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
                        });
                    }
                    else {
                        alert('failed' + this.getStatus());
                    }
                }, {enableHighAccuracy: true});
            }
            getPosition();

            //重新定位
            $(".reposition").on("touchend", function(event) {
                getPosition();
            });

            //是否切换
            $(".messagebox").on("touchend", function() {
                $(".chengaddressbox").show();
                $(".nearbyone").hide();
                $(".bigsearchbox").hide();
                $(".nearbytwo").hide();

                getLocalStorages();
            });

            function getLocalStorages() {
                //获取历史记录
                var addnewarr = addls.getItem("address");

                if(addnewarr) {
                    addnewArrs.splice(0, addnewArrs.length);

                    for(var i = 0; i < (addnewarr.split(",")).length; i++) {
                        addnewArrs[i] = (addnewarr.split(","))[i];
                    }

                    $(".addressul").children().remove();
                    $.each(addnewArrs, function(i) {
                        $(".addressul").prepend(
                            "<li>" + addnewArrs[i] + "</li>"
                        );
                    });

                    //点击实现显示在输入框的功能
                    $(".addressul li").on("tap", function() {
                        $(".addreinput").val($(this).html());
                    });

                    $(".addresshisbox").show();
                } else {
                    $(".addresshisbox").hide();
                }
            }

            //清除缓存
            $(".addresshisbox .clearbtn").on("tap", function() {
                addls.clear();
                $(".addressul").children().remove();
                addArr.splice(0, addnewArrs.length);
                $(".addresshisbox").hide();
            });

            //显示搜索地址
            $(".changesearch").on("touchend", function() {

                if(!!$(".addreinput").val()) {
                    if(addArr.length) {
                        var addBool = false;

                        for(var i = 0; i < addArr.length; i++) {
                            if(addArr[i] == $(".addreinput").val()) {
                                addBool = true;
                                addArr.splice(i, 1);
                                addArr.push($(".addreinput").val());
                            }
                        }
                        if(!addBool) {
                            addArr.push($(".addreinput").val());
                        }
                    } else {
                        addArr.push($(".addreinput").val());
                    }

                    addls.setItem("address", addArr);

                    getLocalStorages();

                    ////获取历史记录
                    //var addnewarr = addls.getItem("address");
                    //
                    //if(addnewarr) {
                    //    addnewArrs.splice(0, addnewArrs.length);
                    //
                    //    for(var i = 0; i < (addnewarr.split(",")).length; i++) {
                    //        addnewArrs[i] = (addnewarr.split(","))[i];
                    //    }
                    //
                    //    $(".addressul").children().remove();
                    //    $.each(addnewArrs, function(i) {
                    //        $(".addressul").prepend(
                    //            "<li>" + addnewArrs[i] + "</li>"
                    //        );
                    //    });
                    //
                    //    //点击实现显示在输入框的功能
                    //    $(".addressul li").on("tap", function() {
                    //        $(".addreinput").val($(this).html());
                    //    });
                    //
                    //    $(".addresshisbox").show();
                    //} else {
                    //    $(".addresshisbox").hide();
                    //}

                    $(".historybox li").on("tap", function() {
                        $(".inputs").val($(this).html());
                    });

                    var searchaddress = $(".addreinput").val();

                    var myGeo = new BMap.Geocoder();

                    // 将地址解析结果显示在地图上,并调整地图视野
                    myGeo.getPoint(searchaddress, function(point){
                        if (point) {
                            _this.map.centerAndZoom(point, 100);
                            $(".chengaddressbox").hide();
                            $(".nearbyone").hide();
                            $(".bigsearchbox").hide();
                            $(".nearbytwo").show();
                            isremind.showIsmind(".isremindsbox", "重新定位成功！");
                        } else {
                            isremind.showIsmind(".isremindsbox", "地址不存在,请重新输入");
                        }
                    });
                } else {
                    isremind.showIsmind(".isremindsbox", "请输入地址");
                }
            });

            return this;
        }
    }
})();
