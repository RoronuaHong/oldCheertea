;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var Popup = require("./function/Popup");
    var newimgChange = require('./function/newimgchange');
    var swiperFun = require("./function/swiperFun");
    var Popup = require("./function/Popup");
    var imgChange = require("./function/imgchange");
    var changes = require("./function/changestanding");
    var thottles = require("./function/thottle");
    var getquerystring = require("./function/getQueryString");

    var imgchange = new imgChange();
    var swiperfun = new swiperFun();
    var newimgchange = new newimgChange();

    var newShopnear = {
        showArea: function() {
            this.selectAreaBtn();

            //显示GPS
            this.showGps();

            //设置地区
            this.setArea();
        },
        setArea: function() {
            Ajax({
                urls: "region!listRegions.do",
                types: "post",
                dataTypes: "json",
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    var firstList = [];
                    var num = 0;
                    $.each(datas.res_data.list, function(i) {
                        var confirm = 0;
                        num = i;
                        datas.res_data.list[i]["first"] = changes.get(datas.res_data.list[i].local_name);

                        for(var j = -1; j < firstList.length; j++) {
                            if(firstList[j] == datas.res_data.list[i].first) {
                                confirm++;
                            }
                        }
                        if(confirm === 0) {
                            firstList.push(datas.res_data.list[i].first);
                        }
                    });

                    /*排序*/
                    var temp = 0;
                    for (var i = 0; i < firstList.length; i++) {
                        for (var j = 0; j < firstList.length - i; j++) {
                            if (firstList[j] > firstList[j + 1]) {
                                temp = firstList[j + 1];
                                firstList[j + 1] = firstList[j];
                                firstList[j] = temp;
                            }
                        }
                    }
                    $.each(firstList, function(j) {
                        $(".allcitybox").append(
                            "<div class='apartcity'>" +
                                "<h4>" + firstList[j] + "</h4>" +
                            "</div>"
                        );
                    });

                    $.each(datas.res_data.list, function(i) {
                        $.each(firstList, function(j) {
                            if(firstList[j] == datas.res_data.list[i].first) {
                                $(".allcitybox").find("h4").eq(j).parents(".apartcity").append(
                                    "<ul class='allcitylist' data-id='" + datas.res_data.list[i].region_id + "'>" +
                                        "<li>" + datas.res_data.list[i].local_name + "</li>" +
                                    "</ul>"
                                );
                            }
                        });
                    });

                    //设置热门城市的坐标
                    $(".hotcitylist li").on("tap", function() {
                        $(".areashow").html($(this).html() + "市");
                        $(".selectwherewrap").hide();
                        $(".newshopnearwrap").show();
                        $(".smallsearchbox").hide();
                        $(".conbox").show();
                        $(".searchinputs").val("");
                        $(".cancelbtn").hide();
                        $(window).scrollTop(0);
                        $(".selectarea").removeClass("add");
                        $(".arealist").hide();
                        $(".circlelist").hide();
                        $(".areabigbox").children().remove();
                        $(".selectarea").html("全部<span class='downarrow'>∨</span>");
                        $(".areabigbox").append(
                            "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>请选择地区</div>"
                        );

                        //切换图片
                        $.each(datas.res_data.list, function(i) {
                            // if($(".areashow").html() == datas.res_data.list[i].local_name) {
                            if($(".areashow").html().indexOf(datas.res_data.list[i].local_name) > -1) {
                                console.log($(".areashow").html(), datas.res_data.list[i].local_name)
                               $(".searchbox img").attr("src", imgchange.show(datas.res_data.list[i].region_img));
                            }
                        });
                    });

                    //设置城市的坐标
                    $(".allcitylist li").on("tap", function() {
                        var _this = this;

                        Ajax({
                            urls: "region!searchByRegionName.do",
                            types: "post",
                            dataTypes: "json",
                            datas: {
                                regionName: $(_this).html()
                            },
                            successes: function (data) {
                                var datas = JSON.parse(data);
                                console.log(datas);

                                $(".areashow").html($(_this).html());
                                $(".selectwherewrap").hide();
                                $(".newshopnearwrap").show();
                                $(".smallsearchbox").hide();
                                $(".conbox").show();
                                $(".searchinputs").val("");
                                $(".cancelbtn").hide();
                                $(window).scrollTop(0);
                                $(".selectarea").removeClass("add");
                                $(".arealist").hide();
                                $(".circlelist").hide();
                                $(".areabigbox").children().remove();
                                $(".selectarea").html("全部<span class='downarrow'>∨</span>");
                                $(".areabigbox").append(
                                    "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>请选择地区</div>"
                                );

                                //切换图片
                                $.each(datas.res_data.list, function(i) {
                                    if($(".areashow").html() == datas.res_data.list[i].local_name) {
                                        console.log($(".areashow").html(), datas.res_data.list[i].local_name)
                                        $(".searchbox img").attr("src", imgchange.show(datas.res_data.list[i].region_img));
                                    }
                                });
                            }
                        });
                    });
                }
            })
        },
        selectAreaBtn: function() {

            //点击展示和消除功能
            $(".areashow").on("tap", function() {
                $(".selectwherewrap").show();
                $(".newshopnearwrap").hide();
            });

            //取消功能
            $(".delbtn").on("touchend", function(event) {
                event.preventDefault();
                $(window).scrollTop(0);
                $(".selectwherewrap").hide();
                $(".newshopnearwrap").show();
                $(".smallsearchbox").hide();
                $(".conbox").show();
                $(".searchinputs").val("");
                $(".cancelbtn").hide();
            });

            function InputShow() {

                //判断是否有值，显隐叉叉
                if($(this).val()) {
                    $(".cancelbtn").show();

                    //显示搜索框
                    $(".conbox").hide();
                    $(".smallsearchbox").show();

                    //获取数据
                    Ajax({
                        urls: "region!searchByRegionName.do",
                        types: "post",
                        dataTypes: "json",
                        datas: {
                            regionName: $(this).val()
                        },
                        successes: function (data) {
                            var datas = JSON.parse(data);
                            console.log(datas);

                            $(".smallsearchbox").children().remove();

                            if(datas.res_code == 1) {
                                $.each(datas.res_data.regionsList, function(i) {
                                    $(".smallsearchbox").append(
                                        "<li data-id='" + datas.res_data.regionsList[i].p_region_id + "'>" + datas.res_data.regionsList[i].local_name + "</li>"
                                    );
                            });
                            }

                            //实现点击返回
                            $(".smallsearchbox li").on("tap", function() {
                                var _this = this;

                                $(".areashow").html($(_this).html());
                                $(".selectwherewrap").hide();
                                $(".newshopnearwrap").show();
                                $(".smallsearchbox").hide();
                                $(".conbox").show();
                                $(".searchinputs").val("");
                                $(".cancelbtn").hide();
                                $(".selectarea").removeClass("add");
                                $(".arealist").hide();
                                $(".circlelist").hide();
                                $(window).scrollTop(0);
                                $(".areabigbox").children().remove();
                                $(".selectarea").html("全部<span class='downarrow'>∨</span>");
                                $(".areabigbox").append(
                                    "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>请选择地区</div>"
                                );
                            });
                        }
                    });
                } else {
                    $(".cancelbtn").hide();
                }
            }

            //输入功能
            $(".searchinputs").on("input", thottles.init(this, InputShow, 500, 500));

            //取消功能
            $(".cancelbtn").on("tap", function() {
                $(".searchinputs").val("");
                $(this).hide();
            });
        },
        showGps: function() {
            var _this = this;

            $(".positionbox").on("tap", function() {
                _this.loadLocation();
            });
        },
        getLocalAjax: function(local, distance) {
            Ajax({
                urls: "businessCircle!listNearBy.do",
                types: "post",
                dataTypes: "json",
                datas: {
                    longitude: local.lng,
                    latitude: local.lat,
                    radius: distance
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.res_code == 1) {
                        var sessions = window.sessionStorage;

                        //删除联盟商家列表
                        sessions.removeItem("business");

                        //存储联盟商家列表
                        sessions.setItem("business", JSON.stringify(datas.res_data.allianceBusinessList));

                        $(".areabigbox").children().remove();
                        $.each(datas.res_data.allianceBusinessList, function(i) {

                            var imgss = imgchange.show(datas.res_data.allianceBusinessList[i].com_image) || "http://images.cheertea.com/logonews.png";

                            //将店铺添加进去
                            $(".areabigbox").append(
                                "<div class='arealistbox' ids='" + datas.res_data.allianceBusinessList[i].com_id + "'>" +
                                    "<div class='areali clearfix'>" +
                                        "<img src='" + imgss + "' alt='' class='areaimg'>" +
                                        "<div class='rightbox clearfix'>" +
                                            "<div class='contexts'>" +
                                                "<div class='shopname'>" + datas.res_data.allianceBusinessList[i].com_name + "</div>" +
                                                    "<div class='intershop'>进入店铺 ></div>" +
                                                "</div>" +
                                                "<div class='detainandistance'>" +
                                                    "<div class='detail'>" + datas.res_data.allianceBusinessList[i].remark + "</div>" +
                                                    "<div class='distance'>距离 <span class='dis'>" + datas.res_data.allianceBusinessList[i].distance + "</span>千米</div>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<ul class='areabox clearfix'>" +

                                    "</ul>" +
                                "</div>"
                            );
                            console.log(!!datas.res_data.allianceBusinessList[i].goodsList.length)
                            if(!!datas.res_data.allianceBusinessList[i].goodsList.length) {
                                $.each(datas.res_data.allianceBusinessList[i].goodsList, function(j) {
                                    if(j < 3) {
                                        $(".arealistbox").eq(i).find(".areabox").append(
                                            "<li>" +
                                                "<img src='" + imgchange.show(datas.res_data.allianceBusinessList[i].goodsList[j].big) + "' alt=''>" +
                                            "</li>"
                                        );
                                    }
                                });
                            } else {
                                console.log(12345)
                                $(".arealistbox").eq(i).find(".areabox").append(
                                    "<li>" +
                                        "<img src='" + imgchange.show(datas.res_data.allianceBusinessList[i].com_image1) + "' alt=''>" +
                                    "</li>" +
                                    "<li>" +
                                        "<img src='" + imgchange.show(datas.res_data.allianceBusinessList[i].com_image2) + "' alt=''>" +
                                    "</li>" +
                                    "<li>" +
                                        "<img src='" + imgchange.show(datas.res_data.allianceBusinessList[i].com_image3) + "' alt=''>" +
                                    "</li>"
                                );
                            }
                            // swiperfun.Yangsbox();
                        });
                    }

                    if(datas.res_code == 0) {
                        $(".areabigbox").children().remove();
                        $(".areabigbox").append(
                            "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>附近没有商家</div>"
                        );
                    }
                }
            });
        },
        loadLocation: function() {
            var _this = this;

            //获取当前地址地区
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                var geoc = new BMap.Geocoder();

                //获取坐标地址
                _this.local = r.point;

                _this.getLocalAjax(_this.local, 10);

                geoc.getLocation(r.point, function (rs) {
                    _this.addComp = rs.addressComponents;
                    // $(".messagebox").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);

                    //显示当前市
                    $(".positionbox li").eq(0).html(_this.addComp.city);
                    $(".areashow").html(_this.addComp.city);
                });
            });
        },
        tradeareaAjax: function(ele, num, pagesize, local) {
            var _this = this;

            Ajax({
                urls: "businessCircle!getAllianceBusinessListByName.do",
                types: "post",
                dataTypes: "json",
                datas: {
                    longitude: local.lng,
                    latitude: local.lat,
                    business_circle: ele,
                    page: num,
                    pageSize: pagesize
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    $(".arealist").hide();
                    $(".circlelist").hide();
                    $(".selectarea").removeClass("add");

                    if(_this.jj <= 1) {
                        $(".areabigbox").children().remove();
                    }

                    if(datas.res_code == 1) {
                        var sessions = window.sessionStorage;

                        //删除联盟商家列表
                        sessions.removeItem("business");

                        //存储联盟商家列表
                        sessions.setItem("business", JSON.stringify(datas.res_data.allianceBusinessPage));

                        $.each(datas.res_data.allianceBusinessPage.data, function(i) {
                            $(".areabigbox").append(
                                "<div class='arealistbox' ids='" + datas.res_data.allianceBusinessPage.data[i].com_id + "'>" +
                                "<div class='areali clearfix'>" +
                                "<img src='" + imgchange.show(datas.res_data.allianceBusinessPage.data[i].com_image) + "' alt='' class='areaimg'>" +
                                "<div class='rightbox clearfix'>" +
                                "<div class='contexts'>" +
                                "<div class='shopname'>" + datas.res_data.allianceBusinessPage.data[i].com_name + "</div>" +
                                "<div class='intershop'>进入店铺 ></div>" +
                                "</div>" +
                                "<div class='detainandistance'>" +
                                "<div class='detail'>" + datas.res_data.allianceBusinessPage.data[i].remark + "</div>" +
                                "<div class='distance'>距离 <span class='dis'>" + datas.res_data.allianceBusinessPage.data[i].distance + "</span>千米</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "<ul class='areabox clearfix'>" +

                                "</ul>" +
                                "</div>"
                            );

                            // if(!!datas.res_data.allianceBusinessPage.data[i].goodsList) {
                            //     $.each(datas.res_data.allianceBusinessPage.data[i].goodsList, function(j) {
                            //         if(j < 3) {
                            //             $(".areabox").append(
                            //                 "<li>" +
                            //                     "<img src='" + imgchange.show(datas.res_data.allianceBusinessPage[i].goodsList[j].big) + "' alt=''>" +
                            //                 "</li>"
                            //             );
                            //         }
                            //     });
                            // } else {
                            //     $.each(datas.res_data.allianceBusinessPage[i].goodsList, function(j) {
                            //         if(j < 3) {
                            //             $(".areabox").append(
                            //                 "<li>" +
                            //                 "<img src='" + imgchange.show(datas.res_data.allianceBusinessPage.data[i]["com_image" + j]) + "' alt=''>" +
                            //                 "</li>"
                            //             );
                            //         }
                            //     });
                            // }
                        });
                        _this.jj = datas.res_data.page + 1;
                        _this.booleans = true;
                    }

                    if(datas.res_code == 0) {
                        console.log(Popup)
                        Popup("alert", datas.res_info).show();
                    }
                }
            });
        },
        setCityAjax: function(addComp) {
            Ajax({
                urls: "businessCircle!getRegionsByCityName.do",
                types: "post",
                dataTypes: "json",
                datas: {
                    cityName: addComp
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    $(".arealist").children().remove();

                    $(".arealist").append(
                        "<li class='nearbyli'>附近</li>"
                    );
                    if(datas.res_code == 1) {
                        $.each(datas.res_data.regionlist, function(i) {
                            $(".arealist").append(
                                "<li>" + datas.res_data.regionlist[i].local_name + "</li>"
                            );
                        });
                        $(".arealist").show();
                    } else {
                        $(".arealist").append(
                            "<li>暂无地区</li>"
                        );
                        $(".arealist").show();
                    }
                }
            });
        },
        selectArea: function() {
            var _this = this;

            $(".selectarea").on("tap", function(event) {
                event.stopPropagation();

                if(!$(this).hasClass("add") && $(this).hasClass("selectarea")) {
                    $(this).addClass("add");

                    _this.setCityAjax($(".areashow").html());
                } else {
                    $(this).removeClass("add");
                    $(".arealist").hide();
                    $(".circlelist").hide();
                }
            });

            $(".arealist").on("tap", "li", function() {
                var indexss = $(this).index() + 1;

                if($(this).index() > 0) {
                    $(this).addClass("lisels").siblings("li").removeClass("lisels");
                    Ajax({
                        urls: "businessCircle!getBusinessCirclesByRegionName.do",
                        types: "post",
                        dataTypes: "json",
                        datas: {
                            regionName: $(this).html()
                        },
                        successes: function (data) {
                            var datas = JSON.parse(data);
                            console.log(datas);

                            $(".circlelist").css({
                                top: $(".arealist li").height() * indexss + "px"
                            });

                            $(".circlelist").children().remove();
                            if(datas.res_code == 1) {
                                $.each(datas.res_data.businessCirclelist, function(i) {
                                    $(".circlelist").append(
                                        "<li>" + datas.res_data.businessCirclelist[i].business_circle_name + "</li>"
                                    );
                                });
                            }
                            if(datas.res_code == 0) {
                                $(".circlelist").append(
                                    "<li>暂无商圈</li>"
                                );
                            }
                            $(".circlelist").show();
                        }
                    });
                } else if($(this).index() == 0) {
                    _this.loadLocation();
                    $(".arealist").hide();
                    $(".circlelist").hide();
                    $(".selectarea").removeClass("add");
                    $(".selectarea").html("全部<span class='downarrow'>∨</span>");
                }
            });

            $(".circlelist").on("tap", "li", function() {
                $(".areabigbox").children().remove();
                _this.tradeareaAjax($(this).html(), 1, 10, _this.local);
                $(".selectarea").html($(this).html());
                $(".selectarea").attr("area", $(this).html());
            });
        },
        // appends: function(num) {
        //     var _this = this;
        //
        //     Ajax({
        //         urls: "wxShop!pageShop.do",
        //         types: "get",
        //         dataTypes: "json",
        //         datas: {
        //             page: num
        //         },
        //         successes: function(data) {
        //             var datas = JSON.parse(data);
        //             console.log(datas);
        //
        //             if(datas.res_code == 1) {
        //                 // swiperfun.showShop("shopcontentbox", datas.res_data.shopPage.data, "goodsList");
        //                 newimgchange.loadPath('.twopathcontent .swiper-container', true, 3);
        //                 _this.ii = datas.res_data.page + 1;
        //                 _this.boolean = true;
        //             }
        //
        //             if(datas.res_code == 0) {
        //                 Popup("alert", datas.res_info).show();
        //             }
        //         }
        //     });
        // },
        scrollFun: function() {
            var _this = this;
            var viewHeight = $(window).height();
            this.isScroll = true;
            this.ii = 1;
            this.jj = 1;
            this.boolean = true;
            this.booleans = true;

            //滚动下拉加载
            $(window).scroll(function() {
                var pageHeight = $(document.body).height();
                var scrollTop = $(window).scrollTop();
                var aa = (pageHeight - viewHeight - scrollTop) / viewHeight;

                //店铺滚动下拉
                if($(".newshopneartit li").eq(1).hasClass("lisel") && this.isScroll) {
                    if(_this.boolean) {
                        if(aa <= 0.1 && _this.ii > 1) {
                            _this.boolean = false;
                            _this.appends(_this.ii);
                        }
                    }
                }
                if($(".newshopneartit li").eq(0).hasClass("lisel") && this.isScroll) {
                    if(_this.booleans) {
                        if(aa <= 0.1 && _this.jj > 1) {
                            _this.booleans = false;
                            _this.tradeareaAjax($(".selectarea").attr("area"), _this.jj, 10, _this.local);
                        }
                    }
                }
            });
        },
        tabChange: function() {
            $(".newshopneartit li").on("tap", function() {
                $(this).addClass("lisel").siblings("li").removeClass("lisel");
                $(".newshopnearcontent .con").eq($(this).index()).show().siblings(".con").hide();
            });
        },
        newSearch: function() {
            var _this = this;

            $(".searchlink").on("tap", function() {
                $(".newsearchwrap").show();
                $(".newshopnearwrap").hide();
                _this.appendLi();
            });
        },
        clickCancelbtn: function() {
            $(".cancelbtn").on("tap", function() {
                $(".searchinput").val("");
                $(this).hide();
            });
        },
        inputFun: function() {
            $(".searchinput").on("input", function() {

                //判断是否有值，显隐叉叉
                if($(this).val()) {
                    $(".cancelbtn").show();
                } else {
                    $(".cancelbtn").hide();
                }
            });
        },
        deleteArr: function(arrs) {
            var newsarr = [];
            var obj = {};

            for(var i = 0; i < arrs.length; i++) {
                if(!obj[arrs[i]]) {
                    obj[arrs[i]] = 1;
                    newsarr.push(arrs[i]);
                }
            }
            return newsarr;
        },
        localFun: function(arr) {
            var _this = this;
            var ls = window.localStorage;

            arr.push($(".searchinput").val());

            //数组去重
            var newarr = _this.deleteArr(arr);

            ls.setItem("searcharr", newarr);

            //使用ajax传值并显示
            //添加联盟商家
            Ajax({
                urls: "businessCircle!searchAllianceBusiness.do",
                types: "post",
                dataTypes: "json",
                datas: {
                    longitude: _this.local.lng,
                    latitude: _this.local.lat,
                    searchStr: $(".searchinput").val()
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    $(".areabigbox").children().remove();
                    if(datas.res_code == 1) {
                        var sessions = window.sessionStorage;

                        //删除联盟商家列表
                        sessions.removeItem("business");

                        //存储联盟商家列表
                        sessions.setItem("business", JSON.stringify(datas.res_data.allianceBusinessPage));
                        $.each(datas.res_data.allianceBusinessPage.data, function(i) {

                            //将店铺添加进去
                            $(".areabigbox").append(
                                "<div class='arealistbox' ids='" + datas.res_data.allianceBusinessPage.data[i].com_id + "'>" +
                                "<div class='areali clearfix'>" +
                                "<img src='" + imgchange.show(datas.res_data.allianceBusinessPage.data[i].com_image) + "' alt='' class='areaimg'>" +
                                "<div class='rightbox clearfix'>" +
                                "<div class='contexts'>" +
                                "<div class='shopname'>" + datas.res_data.allianceBusinessPage.data[i].com_name + "</div>" +
                                "<div class='intershop'>进入店铺 ></div>" +
                                "</div>" +
                                "<div class='detainandistance'>" +
                                "<div class='detail'>" + datas.res_data.allianceBusinessPage.data[i].remark + "</div>" +
                                "<div class='distance'>距离 <span class='dis'>" + datas.res_data.allianceBusinessPage.data[i].distance + "</span>千米</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "<ul class='areabox clearfix'>" +

                                "</ul>" +
                                "</div>"
                            );

                            // if(!!datas.res_data.allianceBusinessPage.data[i].goodsList) {
                            //     console.log(111)
                            //     $.each(datas.res_data.allianceBusinessPage.data[i].goodsList, function(j) {
                            //         if(j < 3) {
                            //             $(".areabox").append(
                            //                 "<li>" +
                            //                 "<img src='" + imgchange.show(datas.res_data.allianceBusinessPage.data[i].goodsList[j].big) + "' alt=''>" +
                            //                 "</li>"
                            //             );
                            //         }
                            //     });
                            // } else {
                            //     console.log(222)
                            //     $.each(datas[i].goodsList, function(j) {
                            //         if(j < 3) {
                            //             $(".areabox").append(
                            //                 "<li>" +
                            //                 "<img src='" + imgchange.show(datas.res_data.allianceBusinessPage.data[i]["com_image" + j]) + "' alt=''>" +
                            //                 "</li>"
                            //             );
                            //         }
                            //     });
                            // }
                        });
                    }

                    if(datas.res_code == 0) {
                        $(".areabigbox").append(
                            "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>附近没有商家</div>"
                        );
                    }
                }
            });

            // //添加联盟商家
            // Ajax({
            //     urls: "businessCircle!searchShop.do",
            //     types: "post",
            //     dataTypes: "json",
            //     datas: {
            //         searchStr: $(".searchinput").val()
            //     },
            //     successes: function (data) {
            //         var datas = JSON.parse(data);
            //         console.log(datas);
            //
            //         $(".shopcontentbox").children().remove();
            //         if(datas.res_code == 1) {
            //             swiperfun.showShop("shopcontentbox", datas.res_data.shopPage.data, "goodsList");
            //             newimgchange.loadPath('.twopathcontent .swiper-container', true, 3);
            //         }
            //
            //         if(datas.res_code == 0) {
            //             $(".shopcontentbox").append(
            //                 "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>附近没有商家</div>"
            //             );
            //         }
            //     }
            // });

            $(".newsearchwrap").hide();
            $(".newshopnearwrap").show();
        },
        searchBtn: function() {
            var _this = this;
            this.arr = [];
            $(".searchbg").on("tap", function() {
                if(!!$(".searchinput").val()) {
                    _this.isScroll = false;
                    // arr.splice(0, arr.length);
                    _this.localFun(_this.arr);
                    $(".searchinput").val("");
                    $(".cancelbtn").hide();
                } else {
                    Popup("alert", "请输入搜索内容").show();
                }
            });
        },
        appendLi: function() {
            var _this = this;
            var ls = window.localStorage;
            this.liarr = new Array();
            this.liarr = ls.getItem("searcharr") && (ls.getItem("searcharr")).split(",");

            if(!!this.liarr) {
                $(".lastestsearchbox").show();
                this.liarr = this.deleteArr(this.liarr);
                $(".lastestcontent").children().remove();
                $.each(_this.liarr, function(i) {
                    $(".lastestcontent").append(
                        "<li>" + _this.liarr[i] + "</li>"
                    );
                });
            }
            $(".lastestcontent").on("tap", "li", function() {
                $(".searchinput").val($(this).html());
            });
        },
        clearBtn: function() {
            var _this = this;
            $(".clears").on("tap", function() {
                var ls = window.localStorage;
                _this.arr.splice(0, _this.arr.length);
                _this.liarr.splice(0, _this.liarr.length);
                ls.clear();
                $(".lastestsearchbox").hide();
                $(".lastestcontent").children().remove();
            });
        },
        clickAdd: function() {

            //点击添加到输入框
            $(".lastestsearchbox li").on("tap", function() {
                $(".searchinput").val($(this).html());

                //判断是否有值，显隐叉叉
                if($(".searchinput").val()) {
                    $(".cancelbtn").show();
                } else {
                    $(".cancelbtn").hide();
                }
            });
        },
        selectTrade: function() {
            $(".areabigbox").on("tap", ".arealistbox", function() {
                var _this = $(this);
                console.log(_this.attr("ids"))
                Ajax({
                    urls: "businessCircle!getAllianceBusinessById.do",
                    types: "post",
                    dataTypes: "json",
                    datas: {
                        allianceBusinessId: _this.attr("ids")
                    },
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);

                        if(datas.res_code == 1) {

                            var imgbanner = imgchange.show(datas.res_data.allianceBusiness.com_banner) || "http://images.cheertea.com/logobanner1.png";

                            //填入数据
                            $(".position").html(datas.res_data.allianceBusiness.com_address);
                            $(".otherdet li").eq(0).find(".tail").html(datas.res_data.allianceBusiness.com_phone);
                            $(".shopdetaibanner img").attr("src", imgbanner);
                            $(".shopdetailwrap").show();
                            $(".newshopnearwrap").hide();
                            $(".gotoshop").attr("href", "newshoplist.html?ids=" + datas.res_data.allianceBusiness.com_id);
                        }
                        if(datas.res_code == -1) {
                            window.location.href = "../cn/newshopnear.html";
                        }
                    }
                });

                Ajax({
                    urls: "getPromotionListByAllianceId.action",
                    types: "post",
                    dataTypes: "json",
                    datas: {
                        id: _this.attr("ids")
                    },
                    successes: function (data) {
                        var datas = data;
                        console.log(datas);

                        $(".shopimgdetail").children().remove();
                        if(datas.res_code == 1) {
                            $.each(datas.res_data.alliancePromotionList, function(i) {
                                var startdatas = new Date(datas.res_data.alliancePromotionList[i].begin_time);
                                var enddatas = new Date(datas.res_data.alliancePromotionList[i].end_time);
                                $(".shopimgdetail").append(
                                    "<li>" +
                                        "<img src='" + imgchange.show(datas.res_data.alliancePromotionList[i].img) + "' alt='' class='imgs'>" +
                                        "<p class='details'>" + datas.res_data.alliancePromotionList[i].promotion_name + "</p>" +
                                        "<p class='details'>活动时间: " + startdatas.getFullYear() + "-" + (startdatas.getMonth() + 1) + "-" + startdatas.getDate() + " 到 " + enddatas.getFullYear() + "-" + ((enddatas.getMonth() + 1) < 10 ? "0" + (enddatas.getMonth() + 1) : (enddatas.getMonth() + 1)) + "-" + (enddatas.getDate() < 10 ? "0" + enddatas.getDate() : enddatas.getDate()) + "</p>" +
                                    "</li>"
                                );
                            });
                        } else {
                            $(".shopimgdetail").append(
                                "<div class='arealistboxs' style='text-align: center; font-size: .4rem; width: 100%; height: 5rem; line-height: 5rem; color: #e8392e;'>附近没有商家</div>"
                            );
                        }
                    }
                });
            });

            $(".shopdetailwrap .searchback").on("touchend", function(event) {
                event.preventDefault();
                $(".shopdetailwrap").hide();
                $(".newshopnearwrap").show();
            });
        },
        tabChanges: function() {
            $(".shopdetailtit li").on("tap", function() {
                $(this).addClass("lisel").siblings("li").removeClass("lisel");
                $(".shopdetailcon .con").eq($(this).index()).show().siblings(".con").hide();
            });
        },
        wxshare: function() {
            var shareUrl = 'http://wx.cheertea.com/cn/newshopnear.html';
            var url = location.href;
            var member_id = 7077;
            var image_url = "http://www.juyooo.com/templets/xinniu/picture/h_logo.png";

            Ajax({
                types:'POST',
                urls:'/widget?type=group_activity&action=ajaxsign&ajax=yes',
                datas:{url:url, member_id:member_id},
                dataTypes:"json",
                successes: function(data) {
                    wx.config({
                        debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId : data.appid, // 必填，公众号的唯一标识
                        timestamp : data.timestamp, // 必填，生成签名的时间戳
                        nonceStr :  data.nonceStr, // 必填，生成签名的随机串
                        signature : data.signature,// 必填，签名，见附录1
                        jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
                            'onMenuShareAppMessage', 'onMenuShareQQ',
                            'onMenuShareQZone' ]
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function() {

                        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareTimeline({
                            title: "商圈分享", // 分享标题
                            link: shareUrl,
                            imgUrl: image_url , // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                $(".isDelete").hide();
                                alert("分享成功,等待好友加团")
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareAppMessage({
                            title: "商圈分享", // 分享标题
                            desc: "坐拥城市繁华,尽享生活之美。向左走，尽享饕餮;向右望，华灯初上。", // 分享描述
                            link: shareUrl,
                            imgUrl: image_url, // 分享图标
                            type: data.type, // 分享类型,music、video或link，不填默认为link
                            success: function () {

                                // 用户确认分享后执行的回调函数
                                $(".isDelete").hide();
                                alert("分享成功,等待好友加团")
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareQQ({
                            title: "商圈分享", // 分享标题
                            title: "坐拥城市繁华,尽享生活之美。向左走，尽享饕餮;向右望，华灯初上。", // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: image_url, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                $(".isDelete").hide();
                                alert("分享成功,等待好友加团")
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                        /*//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
                         wx.onMenuShareWeibo({
                         title: data.title, // 分享标题
                         title: data.desc, // 分享描述
                         link: data.link, // 分享链接
                         imgUrl: image_url, // 分享图标
                         success: function () {
                         // 用户确认分享后执行的回调函数
                         $(".isDelete").hide();
                         alert("分享成功,等待好友加团")
                         },
                         cancel: function () {
                         // 用户取消分享后执行的回调函数
                         }
                         });*/

                        //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareQZone({
                            title: "3人免费开团，600元到手，还可抽美图T8", // 分享标题
                            title: "坐拥城市繁华,尽享生活之美。向左走，尽享饕餮;向右望，华灯初上。", // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: image_url, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                $(".isDelete").hide();
                                alert("分享成功,等待好友加团")
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });
                    wx.error(function(res){
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        // alert("error");
                    });
                },
                errors: function(){
                    // alert("出现错误，连接未成功");
                }
            });
        },
        /*使用节流进行判断*/
        isShow: function() {
            if(document.body.scrollTop > 200) {
                $(".searchlink").css({
                    background: "#000"
                });
                $(".searchname").css({
                    color: "#000"
                });
                $(".mapbg").css({
                    background: "#000 url(http://images.cheertea.com/mapbg1.png) -.08rem -.15rem no-repeat",
                    backgroundSize: "120%",
                    opacity: ".3"
                });
            } else {
                $(".searchlink").css({
                    background: "#fff"
                });
                $(".searchname").css({
                    color: "#fff"
                });
                $(".mapbg").css({
                    background: "url(http://images.cheertea.com/mapbg1.png) -.08rem -.15rem no-repeat",
                    backgroundSize: "120%",
                    opacity: "1"
                });
            }
        },
        isSearchPage: function() {
            if(!!getquerystring.init("search")) {
                $(".newsearchwrap").show();
                $(".newshopnearwrap").hide();
            }
        },
        getSessionAjax: function() {
            var sessions = window.sessionStorage;
            var datas = JSON.parse(sessions.getItem("business"));

            $.each(datas, function(i) {
                var imgss = imgchange.show(datas[i].com_image) || "http://images.cheertea.com/logonews.png";

                //将店铺添加进去
                $(".areabigbox").empty();
                $(".areabigbox").append(
                    "<div class='arealistbox' ids='" + datas[i].com_id + "'>" +
                    "<div class='areali clearfix'>" +
                    "<img src='" + imgss + "' alt='' class='areaimg'>" +
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
                    "<ul class='areabox clearfix'>" +

                    "</ul>" +
                    "</div>"
                );

                if(!!datas[i].goodsList) {
                    $(".areabox").empty();
                    $.each(datas[i].goodsList, function(j) {
                        if(j < 3) {
                            $(".areabox").append(
                                "<li>" +
                                    "<img src='" + imgchange.show(datas[i].goodsList[j].big) + "' alt=''>" +
                                "</li>"
                            );
                        }
                    });
                }
                // swiperfun.Yangsbox();
            });

            //删除
            sessions.removeItem("business");
        },
        init: function() {
            var _this = this;

            //判断是否载入到搜索页
            this.isSearchPage();

            //选择地区
            this.showArea();

            //获取初始尚圈
            if(!getquerystring.init("getList")) {
                this.loadLocation();
            } else {
                // this.getSessionAjax();
            }

            //选择商圈功能
            this.selectArea();

            // //第一次载入
            // this.appends($(this).index());

            //滑动载入
            this.scrollFun();

            //实现tab切换
            this.tabChange();

            //显示搜索
            this.newSearch();

            //显示最近搜索
            this.appendLi();

            //完成输入框
            this.inputFun();

            //点击取消
            this.clickCancelbtn();

            //点击搜索
            this.searchBtn();

            //点击删除缓存
            this.clearBtn();

            //点击添加
            this.clickAdd();

            //选择商圈查看店铺信息
            this.selectTrade();

            //实现tab切换
            this.tabChanges();

            //微信分享
            this.wxshare();

            //搜索栏颜色变化
            window.onscroll = thottles.init(this, _this.isShow, 500, 500);
        }
    }
    newShopnear.init();
})();
