;(function(win, doc) {
    var $ = require("./common/zepto");
    var newimgChange = require('./function/newimgchange');
    var Ajax = require("./function/ajax");
    var swiperFun = require("./function/swiperFun");
    var swiperfun = new swiperFun();
    var newimgchange = new newimgChange();

    var islogins = require("./function/isLogin");
    var imgChange = require("./function/imgchange");
    var imgchange = new imgChange();

    var getQueryString = require("./function/getQueryString");
    var timestampUtil = require("./function/TimestampUtil");

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

    var togetherBuyDetail = {
        /*判断是否登录*/
        isLogin: function() {
            var islogin = islogins.showFocus();
            !islogin && (window.location.href = publics + "cn/login.html?forward=" + window.location.pathname + window.location.search);
        },
        /*获取商品ajax*/
        getGoodsAjax: function() {
            var _this = this;
            var ids = getQueryString.init("toid");
            console.log(ids);
            Ajax({
                urls: "getTogetherBuyDetails.action",
                dataTypes: "json",
                datas: {
                    id: ids
                },
                successes: function (data) {
                    var datas = data;
                    console.log(datas);

                    if(datas.res_code == 1) {

                        //弹出规格选择框
                        _this.gotogetherBuys(datas.res_data.goodsMap.goods_id);

                        swiperfun.showBanner1(".bigbanner", datas.res_data.goodsMap.galleryList);
                        newimgchange.loadBanner('#newimgchange', 0, true, 1);

                        //名称和价格修改
                        $(".groupcon p").html(datas.res_data.togetherBuyMap.title);
                        $(".pricecon .pri").html(datas.res_data.togetherBuyMap.tb_price);
                        $(".otherpri .surpri").html("￥" + datas.res_data.togetherBuyMap.price);
                        $(".otherpri .savepri").html("立省: ￥" + (datas.res_data.togetherBuyMap.price - datas.res_data.togetherBuyMap.tb_price));

                        $(".somegroupbox h3 span").html(datas.res_data.totalBuyMember);

                        $(".singlermb span").html(datas.res_data.togetherBuyMap.price);
                        $(".singlermbs span").html(datas.res_data.togetherBuyMap.tb_price);

                        //单独购买的goods_id
                        $(".goods_id").val(datas.res_data.togetherBuyMap.goods_id);
                        $(".productid").val(datas.res_data.togetherBuyMap.productid);
                        $(".togetherbuyid").val(datas.res_data.togetherBuyMap.id);
                        $(".activity_status").val(datas.res_data.activity_status);
                        $(".productaddcar").attr("href", "/cn/product_info.html?goods_id=" + datas.res_data.goodsMap.goods_id);

                        _this.appendGroupList(datas, ids);
                    }
                }
            });
        },
        /*获取拼团队伍信息*/
        appendGroupList: function(datas, ids) {
            var imgface = "http://images.cheertea.com/logobgs.png";

            //添加商品详情
            $("#goods-intro").append(datas.res_data.goodsMap.intro);

            //设置计时器，计算倒计时
            var resttime = [];
            var resttimes = [];
            var timerss = [];

            if(datas.res_data.ongoingTogetherBuyList.length > 0) {
                $.each(datas.res_data.ongoingTogetherBuyList, function(i) {
                    if(i < 2) {
                        !!(datas.res_data.ongoingTogetherBuyList[i].member_face) && (imgface = datas.res_data.ongoingTogetherBuyList[i].member_face);
                        resttime[i] = timestampUtil.restTime(datas.res_data.ongoingTogetherBuyList[i].remianTime);

                        if (resttime[i].second > 0) {
                            $(".somegrouplist").append(
                                '<div class="sgchild clearfix">' +
                                '<div class="sgimgbox">' +
                                '<img src="' + imgface + '" alt="" class="sgimg">' +
                                '</div>' +
                                '<div class="sgtail clearfix">' +
                                '<span class="need">还差' + datas.res_data.ongoingTogetherBuyList[i].remain + '人</span>' +
                                '<span class="surtime">' +
                                '剩余:' +
                                '<span class="hours"></span>' +
                                ':' +
                                '<span class="mins"></span>' +
                                ':' +
                                '<span class="secs"></span>' +
                                '</span>' +
                                '</div>' +
                                '<a href="/cn/groupdetail.html?groupId=' + datas.res_data.ongoingTogetherBuyList[i].create_id + '" class="gogroupbtn">去拼团</a>' +
                                '</div>'
                            );

                            $(".sgchild").eq(i).find(".surtime .hours").html(resttime[i].hours < 10 ? "0" + resttime[i].hours : resttime[i].hours);
                            $(".sgchild").eq(i).find(".surtime .mins").html(resttime[i].minutes < 10 ? "0" + resttime[i].minutes : resttime[i].minutes);
                            $(".sgchild").eq(i).find(".surtime .secs").html(resttime[i].second < 10 ? "0" + resttime[i].second : resttime[i].second);

                            resttimes[i] = datas.res_data.ongoingTogetherBuyList[i].remianTime;
                            timerss[i] = setInterval(function () {
                                // Ajax({
                                //     urls: "getTogetherBuyDetails.action",
                                //     dataTypes: "json",
                                //     datas: {
                                //         id: ids
                                //     },
                                //     successes: function (datass) {
                                        resttimes[i] -= 1000;
                                        resttime[i] = timestampUtil.restTime(resttimes[i]);

                                        if(timerss[i] >= 0) {
                                            $(".sgchild").eq(i).find(".surtime .hours").html(resttime[i].hours < 10 ? "0" + resttime[i].hours : resttime[i].hours);
                                            $(".sgchild").eq(i).find(".surtime .mins").html(resttime[i].minutes < 10 ? "0" + resttime[i].minutes : resttime[i].minutes);
                                            $(".sgchild").eq(i).find(".surtime .secs").html(resttime[i].second < 10 ? "0" + resttime[i].second : resttime[i].second);
                                        } else {
                                            $(".sgchild").eq(i).remove();
                                            if($(".sgchild").length <= 0) {
                                                $(".somegroupbox h3").hide();
                                            }
                                            clearInterval(timerss[i]);
                                        }
                                //     }
                                // });
                            }, 1000);
                        } else {
                            $(".sgchild").eq(i).hide();
                            console.log($(".sgchild").length)
                            if($(".sgchild").length <= 0) {
                                $(".somegroupbox h3").hide();
                            }
                            clearInterval(timerss[i]);
                        }
                    }
                });
            } else {
                $(".somegroupbox h3").hide();
            }
        },
        /*返回顶部*/
        returnTops: function() {
            $(".returntopandpagesum").on("touchend", function(event) {
                $("body, html").scrollTop(0);
            });
        },
        /*实现去开团功能*/
        gotogetherBuys: function(goodsids) {

            //单独购买弹出选择规格
            $(".productaddcar").on("touchend", function() {

            });

            //去拼团弹出选择规格
            $(".buyquicklys").on("touchend", function() {

            });

            // 加入购物车立即购买产品规格
            function show() {
                //实现商品规格功能
                $(".buyingquick").on("touchend", function(event) {
                    event.preventDefault();
                });
            }

            function Buy(mainEle, goodsid) {
               /* if(mainEle == ".buyquicklys") {
                    $(".specbox").attr("specbox", "1");
                } else if(mainEle == ".productaddcar") {
                    $(".specbox").attr("specbox", "2");
                }*/

                //立即购买
                $(mainEle).on("touchend", function(event) {
                    event.preventDefault();
                    Ajax({
                        urls: "member/login!isLogin.do",
                        dataTypes: "json",
                        types: "get",
                        successes: function(json) {
                            console.log(json);

                            //只有一个F的时候不显示
                            Ajax({
                                urls: "spec/displayNoneSpec.action",
                                dataTypes: "json",
                                types: "get",
                                datas: {
                                    id: goodsid,
                                },
                                successes: function(jsons) {
                                    console.log(jsons);

                                    if(jsons.res_code == 1) {
                                        $(".mesbox").hide();
                                        $("#specboxs").css({
                                            height: "6rem"
                                        });
                                    }

                                    $(".selected").html("");
                                    if(mainEle == ".buyingquick") {
                                        $("#specboxs").attr("main", "1");
                                    } else {
                                        $("#specboxs").attr("main", "0");
                                    }
                                    if(json.res_code == 0) {
                                        alert("你尚未登录！");
                                        window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
                                    } else {

                                        //获取数据
                                        Ajax({
                                            urls: "getSpecValueListByGoodsId.action",
                                            dataTypes: "json",
                                            types: "post",
                                            datas: {
                                                //ids: goodsid
                                                id: goodsid,
                                            },
                                            successes: function(data) {
                                                console.log(data);
                                                Ajax({
                                                    urls: "spec/getValueStoreDetail.action",
                                                    dataTypes: "json",
                                                    types: "get",
                                                    datas: {
                                                        id: goodsid,
                                                    },
                                                    successes: function(datas) {
                                                        console.log(datas);
                                                        if(mainEle == ".buyquicklys") {
                                                            $("#pri").html($(".pricecon .pri").html());
                                                        } else {
                                                            $("#pri").html(datas.res_data.valueStoreList[0].price);
                                                        }
                                                        $("#specboxs").show();

                                                        var imgurls = datas.res_data.valueStoreList[0].image;
                                                        console.log(imgurls)
                                                        if(imgurls) {
                                                            imgurls = imgurls.replace("fs:/", "http://files.cheertea.com/statics/");
                                                        }

                                                        $("#specimg").attr("src", imgurls);

                                                        //添加到规格表中
                                                        if(data.res_code == 1) {
                                                            $(".mesbox").empty();
                                                            $(".mesbox").append(
                                                                "<div class='specpath' ids='" + data.res_data.specValueList[0].spec_id + "'>" +
                                                                "<h3>" + data.res_data.specValueList[0].spec_name + "</h3>" +
                                                                "<ul class='specul clearfix'>" +

                                                                "</ul>" +
                                                                "</div>"
                                                            );

                                                            if(!!data.res_data.specValueList[1]) {
                                                                $(".mesbox").append(
                                                                    "<div class='specpath' ids='" + data.res_data.specValueList[1].spec_id + "'>" +
                                                                    "<h3>" + data.res_data.specValueList[1].spec_name + "</h3>" +
                                                                    "<ul class='speculs clearfix'>" +

                                                                    "</ul>" +
                                                                    "</div>"
                                                                );

                                                                $.each(data.res_data.specValueList[1].valueList, function(j) {
                                                                    $(".speculs").append(
                                                                        "<li speid='" + data.res_data.specValueList[1].valueList[j].spec_id + "' specid='" + data.res_data.specValueList[1].valueList[j].spec_value_id + "'>" + data.res_data.specValueList[1].valueList[j].spec_value + "</li>"
                                                                    );
                                                                });
                                                            }

                                                            $.each(data.res_data.specValueList[0].valueList, function(j) {
                                                                $(".specul").append(
                                                                    "<li speid='" + data.res_data.specValueList[0].valueList[j].spec_id + "' specid='" + data.res_data.specValueList[0].valueList[j].spec_value_id + "'>" + data.res_data.specValueList[0].valueList[j].spec_value + "</li>"
                                                                );
                                                            });

                                                            //当规格值只剩下一个的时候，直接显示
                                                            if($(".specul li").length < 2) {
                                                                $(".specul li").eq(0).addClass("lisel");
                                                                $(".selected").html("已选择<span>" + $(".specul .lisel").html() + "</span>");
                                                                Ajax({
                                                                    urls: "spec/getValueStoreDetail.action",
                                                                    dataTypes: "json",
                                                                    types: "get",
                                                                    datas: {
                                                                        id: goodsid,
                                                                    },
                                                                    successes: function(data) {
                                                                        if(mainEle == ".buyquicklys") {
                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                        } else {
                                                                            $("#pri").html(data.res_data.valueStoreList[0].price);
                                                                        }

                                                                        if($(".speculs li").length < 2 && !!$(".speculs li").length) {
                                                                            $(".speculs li").eq(0).addClass("lisel");

                                                                            //获取规格数值
                                                                            Ajax({
                                                                                urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                                                                                dataTypes: "json",
                                                                                types: "get",
                                                                                successes: function(datas) {
                                                                                    console.log(datas);
                                                                                    if(datas.res_code == 1) {
                                                                                        if(mainEle == ".buyquicklys") {
                                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                                        } else {
                                                                                            $("#pri").html(datas.res_data.product.price);
                                                                                        }
                                                                                        $("#stores").html(datas.res_data.product.store);
                                                                                        /* $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span>"); */
                                                                                        if($(".speculs li").length < 2 && !!$(".speculs li").length) {
                                                                                            $(".selected").html($(".selected").html() + "<span>" + $(".speculs .lisel").html() + "</span>");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        }

                                                                        if(!$(".speculs li").length) {
                                                                            //获取规格数值
                                                                            Ajax({
                                                                                urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid"),
                                                                                dataTypes: "json",
                                                                                types: "get",
                                                                                successes: function(datas) {
                                                                                    console.log(1111)
                                                                                    console.log(datas);
                                                                                    if(datas.res_code == 1) {
                                                                                        if(mainEle == ".buyquicklys") {
                                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                                        } else {
                                                                                            $("#pri").html(datas.res_data.product.price);
                                                                                        }
                                                                                        $("#stores").html(datas.res_data.product.store);
                                                                                        /* $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span>"); */
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }

                                                            if(!!$(".speculs li").length && $(".speculs li").length < 2) {
                                                                $(".speculs li").eq(0).addClass("lisel");

                                                                Ajax({
                                                                    urls: "spec/getValueStoreDetail.action",
                                                                    dataTypes: "json",
                                                                    types: "get",
                                                                    datas: {
                                                                        id: goodsid,
                                                                    },
                                                                    successes: function(data) {

                                                                        console.log(data);
                                                                        if($(".specul li").length < 2) {
                                                                            $(".specul li").eq(0).addClass("lisel");

                                                                            //获取规格数值
                                                                            Ajax({
                                                                                urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid"),
                                                                                dataTypes: "json",
                                                                                types: "get",
                                                                                successes: function(datas) {
                                                                                    console.log(1111)
                                                                                    console.log(datas);
                                                                                    if(datas.res_code == 1) {
                                                                                        if(mainEle == ".buyquicklys") {
                                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                                        } else {
                                                                                            $("#pri").html(datas.res_data.product.price);
                                                                                        }
                                                                                        $("#stores").html(datas.res_data.product.store);
                                                                                        /* $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>"); */
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }

                                                            //进行库存比对
                                                            $.each($(".mesbox li"), function(i) {
                                                                $(".mesbox li").eq(i).addClass("unli");
                                                            });
                                                            $.each(datas.res_data.valueStoreList, function(i) {
                                                                $.each($(".mesbox li"), function(j) {
                                                                    if(datas.res_data.valueStoreList[i].spec_value_id == $(".mesbox li").eq(j).attr("specid")) {
                                                                        if(!!datas.res_data.valueStoreList[i].store) {
                                                                            $(".mesbox li").eq(j).removeClass("unli");
                                                                        }
                                                                    }
                                                                });
                                                            });
                                                        }
                                                    }
                                                });
                                            },
                                            error: function(data) {
                                                console.log(data);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
            }

            Buy(".buyquicklys", goodsids);

            /*Buy(".productaddcar", goodsids);*/

            //选择规格功能按钮
            function SelectSpec(goodsid) {
                $("#specboxs").on("touchend", ".specul li", function() {
                    if(!$(this).hasClass("unli") && !!$(this).siblings("li")) {
                        if($(this).hasClass("lisel")) {
                            $(this).removeClass("lisel");
                            $(".speculs li").removeClass("unli");
                            $(".selected").html("");
                            $("#stores").html(0);
                        } else {
                            $(this).addClass("lisel").siblings("li").removeClass("lisel");
                            Ajax({
                                urls: "spec/getValueStoreDetail.action",
                                dataTypes: "json",
                                types: "get",
                                datas: {
                                    id: goodsid,
                                    spec_id: $(this).attr("speid"),
                                    spec_value_id: $(this).attr("specid")
                                },
                                successes: function(datas) {
                                    console.log(datas);

                                    //进行库存比对
                                    $.each($(".speculs li"), function(i) {
                                        $(".speculs li").eq(i).addClass("unli");
                                    });
                                    $.each(datas.res_data.valueStoreList, function(i) {
                                        if(!!datas.res_data.valueStoreList[i].store) {
                                            $.each($(".speculs li"), function(j) {
                                                if(datas.res_data.valueStoreList[i].spec_value_id == $(".speculs li").eq(j).attr("specid")) {
                                                    $(".speculs li").eq(j).removeClass("unli");
                                                }
                                            });
                                        }
                                    });

                                    /* specvarr.push(); */
                                    if(!!$(".speculs li").length) {

                                        if(!!$(".specul li").hasClass("lisel") && !!$(".speculs li").hasClass("lisel")) {

                                            //获取规格数值
                                            Ajax({
                                                urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                                                dataTypes: "json",
                                                types: "get",
                                                successes: function(datas) {
                                                    console.log(datas);
                                                    if(datas.res_code == 1) {
                                                        /*if(mainEle == ".buyquicklys") {
                                                            $("#pri").html($(".pricecon .pri").html());
                                                        } else {
                                                            $("#pri").html(datas.res_data.product.price);
                                                        }*/
                                                        $("#stores").html(datas.res_data.product.store);
                                                        $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>");
                                                    }
                                                }
                                            });
                                        }
                                    } else {

                                        //获取规格数值
                                        Ajax({
                                            urls: "spec/getProduct.action",
                                            dataTypes: "json",
                                            types: "get",
                                            datas: {
                                                goods_id: goodsid,
                                                spec_value_ids: $(".specul .lisel").attr("specid")
                                            },
                                            successes: function(datas) {
                                                console.log(datas);
                                                if(datas.res_code == 1) {
                                                    /*if(mainEle == ".buyquicklys") {
                                                        $("#pri").html($(".pricecon .pri").html());
                                                    } else {
                                                        $("#pri").html(datas.res_data.product.price);
                                                    }*/
                                                    $("#stores").html(datas.res_data.product.store);
                                                    $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span>");
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });

                $("#specboxs").on("touchend", ".speculs li", function() {
                    if(!$(this).hasClass("unli") && !!$(this).siblings("li")) {
                        if($(this).hasClass("lisel")) {
                            $(this).removeClass("lisel");
                            $(".specul li").removeClass("unli");
                            $(".selected").html("");
                            $("#stores").html(0);
                        } else {
                            $(this).addClass("lisel");
                            $(this).addClass("lisel").siblings("li").removeClass("lisel");
                            Ajax({
                                urls: "spec/getValueStoreDetail.action",
                                dataTypes: "json",
                                types: "get",
                                datas: {
                                    id: goodsid,
                                    spec_id: $(this).attr("speid"),
                                    spec_value_id: $(this).attr("specid")
                                },
                                successes: function(data) {
                                    console.log(data);

                                    //进行库存比对
                                    $.each($(".specul li"), function(i) {
                                        $(".specul li").eq(i).addClass("unli");
                                    });
                                    $.each(data.res_data.valueStoreList, function(i) {
                                        if(!!data.res_data.valueStoreList[i].store) {
                                            $.each($(".specul li"), function(j) {
                                                if(data.res_data.valueStoreList[i].spec_value_id == $(".specul li").eq(j).attr("specid")) {

                                                    $(".specul li").eq(j).removeClass("unli");
                                                }
                                            });
                                        }
                                    });

                                    if(!!$(".specul li").hasClass("lisel") && !!$(".speculs li").hasClass("lisel")) {

                                        //获取规格数值
                                        Ajax({
                                            urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                                            dataTypes: "json",
                                            types: "get",
                                            successes: function(datas) {
                                                console.log(datas);
                                                if(datas.res_code == 1) {
                                                    // if(mainEle == ".buyquicklys") {
                                                    //     $("#pri").html($(".pricecon .pri").html());
                                                    // } else {
                                                    //     $("#pri").html(datas.res_data.product.price);
                                                    // }
                                                    $("#stores").html(datas.res_data.product.store);
                                                    $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>");
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
            SelectSpec(goodsids);

            //取消规格
            $(".chacha").on("touchend", function(event) {
                event.preventDefault();
                $("#specboxs").hide();
            });

            //选择规格功能
            $(".specul").on("touchend", function(event) {
                event.preventDefault();

            });

            //正则匹配numbox
            $("#numinput").on("input", function() {
                if(!/\d/.test($(this).val())) {
                    $(this).val("");
                }
                if(/^0/.test($(this).val())) {
                    $(this).val("");
                }
            });

            var num = 1;

            //加减功能
            $(".plus").on("touchend", function(event) {
                event.preventDefault();

                if(!$("#numinput").val()) {
                    $("#numinput").val(num);
                } else {
                    num++;
                }
                $("#numinput").val(num);
            });

            $(".minus").on("touchend", function(event) {
                event.preventDefault();

                if(!$("#numinput").val()) {
                    num = 1;
                    $("#numinput").val(num);
                } else {
                    if(num > 1) {
                        num--;
                    }
                }
                $("#numinput").val(num);
            });

            //立即购买
            /* if((window.location.href).split("?")[1] == 2) {
             $(".buyingquick").html("兑奖");
             } */

            $(".containbtn").on("touchend", function() {

                //获取第一个规格和第二个规格
                var first = $(".specul .lisel").attr("specid");
                var second = $(".speculs .lisel").attr("specid");
                console.log(first, second)

                if(!!second) {
                    if(first && second) {
                        Ajax({
                            urls: "widget?type=together_buy&action=createGroup&ajax=yes&flag=1&activity_status=" + $(".activity_status").val() + "&togetherbuyid=" + $(".togetherbuyid").val() + "&goodsid=" + $(".goods_id").val() + "&spec_value_ids=" + first + "&spec_value_ids=" + second + "&num=" + $("#numinput").val(),
                            dataTypes: "json",
                            types: "get",
                            successes: function(json) {
                                console.log(json);
                                json = JSON.parse(json);
                                if(json.result == 0){

                                    /* 添加失败 */
                                    var v = json.message;
                                    alert(v);

                                    if(v == "您尚未登录" ){
                                        window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
                                    }

                                } else if(json.result == 1){
                                    location.href = publics + "checkout.html?isGroup=1";
                                }
                            }
                        });
                    } else {
                        alert("请选择完整规格！");
                    }

                } else {
                    if(!$(".speculs li").length) {
                        if($(".specul .lisel").length) {
                            Ajax({
                                urls: "widget?type=together_buy&action=createGroup&ajax=yes&flag=1&activity_status=" + $(".activity_status").val() + "&togetherbuyid=" + $(".togetherbuyid").val() + "&goodsid=" + $(".goods_id").val() + "&spec_value_ids=" + first + "&num=" + $("#numinput").val(),
                                dataTypes: "json",
                                types: "get",
                                successes: function(json) {
                                    json = JSON.parse(json);
                                    console.log(json);
                                    if(json.result == 0){

                                        /* 添加失败 */
                                        var v = json.message;
                                        alert(v);
                                        if(v == "您尚未登录" ){
                                            window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
                                        }
                                    }else if(json.result == 1){
                                        location.href = publics + "checkout.html?isGroup=1";
                                        // if($("#specboxs").attr("main") == 1) {
                                        //     if((window.location.href).split("?")[1] == 2) {
                                        //         location.href="http://wx.cheertea.com/checkout.html?2";
                                        //     } else {
                                        //         location.href="http://wx.cheertea.com/checkout.html";
                                        //     }
                                        // } else if($("#specboxs").attr("main") == 0) {
                                        //     $("#specboxs").hide();
                                        //     alert("加入购物车成功！");
                                        //     Ajax({
                                        //         urls: "member/cart!getNum.do",
                                        //         types: "get",
                                        //         dataTypes: "json",
                                        //         successes: function (data) {
                                        //             var datas = data;
                                        //             console.log(datas);
                                        //
                                        //             // 实现数字的隐藏和显示
                                        //             if(datas.res_data) {
                                        //                 if(parseInt(datas.res_data.num) >= 1) {
                                        //                     $(".carnumber").html(datas.res_data.num);
                                        //                     $(".carnumber").show();
                                        //                 } else {
                                        //                     $(".carnumber").hide();
                                        //                 }
                                        //             }
                                        //         }
                                        //     });
                                        // }
                                    }
                                }
                            });
                        } else {
                            alert("请选择规格！");
                        }
                    } else {
                        alert("请选择完整规格！");
                    }
                }
            });

            function buyquickly(goodsid){


                Ajax({


                    urls : "widget?type=shop_cart&action=add&ajax=yes&flag=1",


                    types : "get",


                    datas:{


                        goodsid:goodsids,


                        activityId:10,


                        activityPrice:10


                    },


                    dataTypes : "json",


                    successes:function(json){
                        console.log(json);

                        if(json.result == 0){


                            /* 添加失败 */


                            var v = json.message;


                            alert("请选择完整规格！");


                        }else if(json.result == 1){

                            if((window.location.href).split("?")[1] == 2) {
                                location.href="http://wx.cheertea.com/checkout.html?2";
                            } else {
                                location.href="http://wx.cheertea.com/checkout.html?isGroup=1";
                            }


                        }


                    },


                    error:function(json){


                        console.log(json);


                    }

                });

            };
        },
        init: function() {

            //判断是否登录
            this.isLogin();

            //获取商品ajax
            this.getGoodsAjax();

            //返回顶部
            this.returnTops();
        }
    }
    togetherBuyDetail.init();
})(window, document);
