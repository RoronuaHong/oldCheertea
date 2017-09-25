;(function(win, doc) {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");
    var islogins = require("./function/isLogin");
    var newimgChange = require('./function/newimgchange');
    var imgChange = require("./function/imgchange");
    var imgchange = new imgChange();
    var islogins = require("./function/isLogin");
    var swiperFun = require("./function/swiperFun");
    var swiperfun = new swiperFun();
    var newimgchange = new newimgChange();

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

    var groupDetail = {
        /*判断是否登录*/
        isLogin: function() {
            var islogin = islogins.showFocus();
            !islogin && (window.location.href = publics + "cn/login.html?forward=" + window.location.pathname + window.location.search);
        },
        /*获取ajax*/
        getAjax: function() {
            var _this = this;

            var ids = getQueryString.init("groupId");
            var timerss = null;
            var resttime = [];

            Ajax({
                urls: "getTogetherBuyGroupDetails.action",
                dataTypes: "json",
                datas: {
                    groupId: ids
                },
                successes: function (data) {
                    var datas = data;
                    console.log(datas);

                    //传值
                    $(".togetherBuyGroupIds").val(ids);
                    $(".goods_id").val(datas.res_data.togetherBuyGroupMap.goods_id);
                    $(".activity_status").val(datas.res_data.togetherBuyGroupMap.status);

                    swiperfun.showBanner1(".bigbanner", datas.res_data.goodsMap.galleryList);
                    newimgchange.loadBanner('#newimgchange', 0, true, 1);

                    //获取标题
                    $(".groupcon p").html(datas.res_data.togetherBuyGroupMap.title);
                    $(".pri").html(datas.res_data.togetherBuyGroupMap.tb_price);
                    $(".surpri").html("￥" + datas.res_data.togetherBuyGroupMap.price);
                    $(".savepri").html("立省: ￥" + (datas.res_data.togetherBuyGroupMap.price - datas.res_data.togetherBuyGroupMap.tb_price));

                    if(datas.res_data.togetherBuyGroupMap.remaintime > 0) {
                        if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                            $(".restmemberbox").hide();
                            $(".detailDel").hide();
                            $(".othernum li").eq(3).removeClass("gray");
                            $(".othernum li").eq(3).find(".num").removeClass("grays");

                            $(".moregroupbox").hide();
                            $(".moregroup").show();
                            $(".success").show();
                            $(".fail").hide();
                            $(".continue").hide();
                            $(".reststimebox").hide();
                            $(".overtimebox").show();
                        } else {
                            $(".detailDel").show();
                            $(".success").hide();
                            $(".fail").hide();
                            $(".continue").show();
                            $(".reststimebox").show();
                            $(".overtimebox").hide();
                            $(".othernum li").eq(3).addClass("gray");
                            $(".othernum li").eq(3).find(".num").addClass("grays");
                        }
                    } else {
                        if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                            $(".restmemberbox").hide();
                            $(".detailDel").hide();
                            $(".othernum li").eq(3).removeClass("gray");
                            $(".othernum li").eq(3).find(".num").removeClass("grays");

                            $(".success").show();
                            $(".fail").hide();
                            $(".continue").hide();
                            $(".reststimebox").hide();
                            $(".overtimebox").show();
                        } else {
                            $(".detailDel").hide();
                            $(".success").hide();
                            $(".fail").show();
                            $(".continue").hide();
                            $(".reststimebox").hide();
                            $(".overtimebox").show();
                            $(".othernum li").eq(3).addClass("gray");
                            $(".othernum li").eq(3).find(".num").addClass("grays");
                        }
                    }

                    // if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                    //     $(".restmemberbox").hide();
                    //     $(".detailDel").hide();
                    //     $(".othernum li").eq(3).addClass("gray");
                    //     $(".othernum li").eq(3).find("num").addClass("grays");
                    //
                    //     $(".success").show();
                    //     $(".fail").hide();
                    //     $(".reststimebox").hide();
                    //     $(".overtimebox").show();
                    //
                    //     if($(".moregroupbox").css("display") == "none") {
                    //         $(".detailDel").show();
                    //     } else {
                    //         $(".detailDel").hide();
                    //     }
                    // } else {
                    //
                    //     $(".detailDel").hide();
                    //     // $(".othernum li").eq(3).removeClass("gray");
                    //     // $(".othernum li").eq(3).find("num").removeClass("grays");
                    // }

                    $(".showlast span").html(datas.res_data.togetherBuyGroupMap.remain);
                    $(".restmemberbox .other").html(datas.res_data.togetherBuyGroupMap.remain);
                    $(".restmemberbox .total").html(datas.res_data.togetherBuyGroupMap.total);

                    //团长信息
                    var imgFace = "http://images.cheertea.com/logobgs.png";
                    !!(datas.res_data.togetherBuyGroupMap.parentMember.weixin_face) && (imgFace = datas.res_data.togetherBuyGroupMap.parentMember.weixin_face);
                    $(".groupmemberbox li").find(".liimg").attr("src", datas.res_data.togetherBuyGroupMap.parentMember.weixin_face);

                    //动态添加团员信息
                    var childmember = "http://images.cheertea.com/logobgs.png";
                    if(!!datas.res_data.togetherBuyGroupMap.memberList) {
                        $.each(datas.res_data.togetherBuyGroupMap.memberList, function(i) {
                            if(i < 2) {
                                !!(datas.res_data.togetherBuyGroupMap.memberList[i].weixin_face) && (childmember = datas.res_data.togetherBuyGroupMap.memberList[i].weixin_face);
                                $(".groupmemberbox").append(
                                    "<li>" +
                                        "<img src='" + childmember + "' alt='' class='liimg'>" +
                                    "</li>"
                                );
                            }
                        });
                    }

                    //获取时间
                    $(".reststimebox .hours").html(resttime.hours < 10 ? "0" + resttime.hours : resttime.hours);
                    $(".reststimebox .mins").html(resttime.minutes < 10 ? "0" + resttime.minutes : resttime.minutes);
                    $(".reststimebox .secs").html(resttime.second < 10 ? "0" + resttime.second : resttime.second);

                    var resttimes = datas.res_data.togetherBuyGroupMap.remaintime;

                    timerss = setInterval(function() {
                        resttimes -= 1000;
                        resttime = timestampUtil.restTime(resttimes);
                        if(resttimes >= 0) {
                            if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                                $(".reststimebox").hide();
                                $(".overtimebox").show();
                            } else {
                                $(".reststimebox").show();
                                $(".overtimebox").hide();
                                $(".reststimebox .hours").html(resttime.hours < 10 ? "0" + resttime.hours : resttime.hours);
                                $(".reststimebox .mins").html(resttime.minutes < 10 ? "0" + resttime.minutes : resttime.minutes);
                                $(".reststimebox .secs").html(resttime.second < 10 ? "0" + resttime.second : resttime.second);
                            }
                        } else {
                            $(".reststimebox").hide();
                            $(".overtimebox").show();
                            $(".moregroupbox").hide();
                            $(".moregroup").show();
                            $(".restmemberbox").hide();
                            $(".detailDel").hide();
                            clearInterval(timerss);

                            //判断拼团是否成功
                            if(datas.res_data.togetherBuyGroupMap.remaintime > 0) {
                                if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                                    $(".restmemberbox").hide();
                                    $(".detailDel").hide();
                                    $(".othernum li").eq(3).removeClass("gray");
                                    $(".othernum li").eq(3).find(".num").removeClass("grays");

                                    $(".moregroupbox").hide();
                                    $(".moregroup").show();
                                    $(".success").show();
                                    $(".fail").hide();
                                    $(".continue").hide();
                                    $(".reststimebox").hide();
                                    $(".overtimebox").show();
                                } else {
                                    $(".detailDel").show();
                                    $(".success").hide();
                                    $(".fail").hide();
                                    $(".continue").show();
                                    $(".reststimebox").show();
                                    $(".overtimebox").hide();
                                    $(".othernum li").eq(3).addClass("gray");
                                    $(".othernum li").eq(3).find(".num").addClass("grays");
                                }
                            } else {
                                if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                                    $(".restmemberbox").hide();
                                    $(".detailDel").hide();
                                    $(".othernum li").eq(3).removeClass("gray");
                                    $(".othernum li").eq(3).find(".num").removeClass("grays");

                                    $(".success").show();
                                    $(".fail").hide();
                                    $(".continue").hide();
                                    $(".reststimebox").hide();
                                    $(".overtimebox").show();
                                } else {
                                    $(".detailDel").hide();
                                    $(".success").hide();
                                    $(".fail").show();
                                    $(".continue").hide();
                                    $(".reststimebox").hide();
                                    $(".overtimebox").show();
                                    $(".othernum li").eq(3).addClass("gray");
                                    $(".othernum li").eq(3).find(".num").addClass("grays");
                                }
                            }
                            // if(datas.res_data.togetherBuyGroupMap.remain <= 0) {
                            //     $(".success").show();
                            //     $(".fail").hide();
                            //     $(".reststimebox").hide();
                            //     $(".overtimebox").show();
                            // } else {
                            //     $(".success").hide();
                            //     $(".fail").show();
                            //     $(".reststimebox").show();
                            //     $(".overtimebox").hide();
                            // }
                        }

                    }, 1000);

                    //实现分享功能
                    _this.shareWx(datas.res_data.togetherBuyGroupMap.member_id, datas.res_data.togetherBuyGroupMap.title, datas.res_data.togetherBuyGroupMap.create_id);
                }
            });
        },
        /*遮罩层*/
        detailDel: function() {
            $(".showbox").on("touchstart", function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
            $(".showbox").on("touchmove", function(event) {
                event.preventDefault();
            });

            $(".detailDel").on("touchmove", function(event) {
                event.preventDefault();
            });

            $(".detailDel").on("touchend", function(event) {
                event.preventDefault();
                $(this).hide();
            });
        },
        /*点击去参团事件*/
        goCanTuan: function() {
            function Buy(mainEle) {

                //立即购买
                $(mainEle).on("touchend", function(event) {
                    event.preventDefault();
                    Ajax({
                        urls: "member/login!isLogin.do",
                        dataTypes: "json",
                        types: "get",
                        successes: function(json) {
                            console.log(json);
                            //获取数据
                            Ajax({
                                urls: "getSpecValueListByGoodsId.action",
                                dataTypes: "json",
                                types: "get",
                                datas: {
                                    id: $("input[name='goods_id']").val()
                                },
                                successes: function(data) {
                                    console.log(data);
                                    Ajax({
                                        urls: "spec/getValueStoreDetail.action",
                                        dataTypes: "json",
                                        types: "get",
                                        datas: {
                                            id: $("input[name='goods_id']").val()
                                        },
                                        successes: function(datas) {
                                            console.log(datas);
                                            // $("#pri").html(datas.res_data.valueStoreList[0].price);
                                            $("#pri").html($(".pricecon .pri").html());
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
                                                    $(".selected").html("准备选择<span>" + $(".specul .lisel").html() + "</span>");
                                                    Ajax({
                                                        urls: "spec/getValueStoreDetail.action",
                                                        dataTypes: "json",
                                                        types: "get",
                                                        datas: {
                                                            id: $("input[name='goods_id']").val()
                                                        },
                                                        successes: function(data) {
                                                            // $("#pri").html(data.res_data.valueStoreList[0].price);
                                                            $("#pri").html($(".pricecon .pri").html());
                                                            if($(".speculs li").length < 2 && !!$(".speculs li").length) {
                                                                $(".speculs li").eq(0).addClass("lisel");

                                                                //获取规格数值
                                                                $.ajax({
                                                                    url: "spec/getProduct.action?goodsid=" + $("input[name='goods_id']").val() + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid") + "&spec_value_ids[]=" + $(".specul .lisel").attr("specid") + "&spec_value_ids[]=" + $(".speculs .lisel").attr("specid"),
                                                                    dataType: "json",
                                                                    type: "get",
                                                                    success: function(datas) {
                                                                        console.log(datas);
                                                                        if(datas.res_code == 1) {
                                                                            // $("#pri").html(datas.res_data.product.price);
                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                            $("#stores").html(datas.res_data.product.store);
                                                                            /* $(".selected").html("准备选择" + "<span>" + $(".specul .lisel").html() + "</span>"); */
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
                                                                    urls: "spec/getProduct.action?goodsid=" + $("input[name='goods_id']").val() + "&spec_value_ids=" + $(".specul .lisel").attr("specid"),
                                                                    dataTypes: "json",
                                                                    types: "get",
                                                                    successes: function(datas) {
                                                                        console.log(1111)
                                                                        console.log(datas);
                                                                        if(datas.res_code == 1) {
                                                                            // $("#pri").html(datas.res_data.product.price);
                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                            $("#stores").html(datas.res_data.product.store);
                                                                            /* $(".selected").html("准备选择" + "<span>" + $(".specul .lisel").html() + "</span>"); */
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
                                                            id: $("input[name='goods_id']").val()
                                                        },
                                                        successes: function(data) {
                                                            console.log(data);
                                                            if($(".specul li").length < 2) {
                                                                $(".specul li").eq(0).addClass("lisel");

                                                                //获取规格数值
                                                                Ajax({
                                                                    urls: "spec/getProduct.action?goodsid=" + $("input[name='goods_id']").val() + "&spec_value_ids=" + $(".specul .lisel").attr("specid"),
                                                                    dataTypes: "json",
                                                                    types: "get",
                                                                    successes: function(datas) {
                                                                        console.log(1111)
                                                                        console.log(datas);
                                                                        if(datas.res_code == 1) {
                                                                            // $("#pri").html(datas.res_data.product.price);
                                                                            $("#pri").html($(".pricecon .pri").html());
                                                                            $("#stores").html(datas.res_data.product.store);
                                                                            /* $(".selected").html("准备选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>"); */
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
                    });
                });
            }

            Buy(".buyquickly");

            //选择规格功能按钮
            function SelectSpec() {
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
                                    id: $("input[name='goods_id']").val(),
                                    spec_id: $(this).attr("speid"),
                                    spec_value_id: $(this).attr("specid")
                                },
                                successes: function(datas) {
                                    console.log(datas);
                                    console.log(33333)
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
                                                urls: "spec/getProduct.action?goodsid=" + $("input[name='goods_id']").val() + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                                                dataTypes: "json",
                                                types: "get",
                                                successes: function(datas) {
                                                    console.log(datas);
                                                    if(datas.res_code == 1) {
                                                        // $("#pri").html(datas.res_data.product.price);
                                                        $("#pri").html($(".pricecon .pri").html());
                                                        $("#stores").html(datas.res_data.product.store);
                                                        $(".selected").html("准备选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>");
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
                                                goodsid: $("input[name='goods_id']").val(),
                                                spec_value_ids: $(".specul .lisel").attr("specid")
                                            },
                                            successes: function(datas) {
                                                console.log(datas);
                                                if(datas.res_code == 1) {
                                                    // $("#pri").html(datas.res_data.product.price);
                                                    $("#pri").html($(".pricecon .pri").html());
                                                    $("#stores").html(datas.res_data.product.store);
                                                    $(".selected").html("准备选择" + "<span>" + $(".specul .lisel").html() + "</span>");
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
                                    id: $("input[name='goods_id']").val(),
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
                                            urls: "spec/getProduct.action?goodsid=" + $("input[name='goods_id']").val() + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                                            dataTypes: "json",
                                            types: "get",
                                            successes: function(datas) {
                                                console.log(datas);
                                                if(datas.res_code == 1) {
                                                    // $("#pri").html(datas.res_data.product.price);
                                                    $("#pri").html($(".pricecon .pri").html());
                                                    $("#stores").html(datas.res_data.product.store);
                                                    $(".selected").html("准备选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>");
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
            SelectSpec();

            //取消规格
            $(".chacha").on("touchend", function(event) {
                event.preventDefault();
                $("#specboxs").hide();
            });

            //选择规格功能
            $(".specul").on("touchend", function(event) {
                event.preventDefault();

            });

            console.log($("input[name='goods_id']").val())

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

            $(".containbtn").on("touchend", function() {

                //获取第一个规格和第二个规格
                var first = $(".specul .lisel").attr("specid");
                var second = $(".speculs .lisel").attr("specid");
                console.log(first, second)

                if(!!second) {
                    if(first && second) {
                        Ajax({
                            urls: "widget?type=together_buy&action=joinGroup&ajax=yes&flag=1" + "&togetherbuyid=" + $("input[name='togetherBuyGroupId']").val() + "&activity_status=" + $("input[name='activity_status']").val() + "&spec_value_ids=" + first + "&spec_value_ids=" + second + "&goodsid=" + $("input[name='goods_id']").val(),
                            dataTypes: "json",
                            types: "get",
                            datas: $("form#togetherBuyForm").serializeArray(),
                            successes: function(json) {
                                console.log(json);
                                json = JSON.parse(json);

                                if(json.result == 0){

                                    /* 添加失败 */
                                    var v = json.message;
                                }else if(json.result == 1){
                                    location.href = publics + "checkout.html?isGroup=1";
                                    // if($("#specboxs").attr("main") == 1) {
                                    //     if((window.location.href).split("?")[1] == 2) {
                                    //         location.href = publics + "checkout.html?2";
                                    //     } else {
                                    //         location.href = publics + "checkout.html";
                                    //     }
                                    // } else if($("#specboxs").attr("main") == 0) {
                                    //     $("#specboxs").hide();
                                    //
                                    //     //实现结算的开团
                                    //     location.href = publics + "checkout.html";
                                    //
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
                        alert("请选择完整规格！");
                    }

                } else {
                    console.log(!$(".speculs li").length)
                    if(!$(".speculs li").length) {
                        console.log(1)
                        var formvle = $("form#togetherBuyForm").serializeArray();
                        Ajax({
                            urls: "widget?type=together_buy&action=joinGroup&ajax=yes&flag=1" + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&togetherbuyid=" + $("input[name='togetherBuyGroupId']").val() + "&goodsid=" + $("input[name='goods_id']").val(),
                            types: "get",
                            datas: formvle,
                            dataTypes: "json",
                            successes: function(json){
                                json = JSON.parse(json);

                                if(json.result == 0){
                                    var v = json.message;
                                    alert(json.message);
                                }else if(json.result == 1){
                                    location.href = publics + "checkout.html?isGroup=1";
                                }
                            },
                            error:function(json){
                                console.log(json);
                            }
                        });
                    } else {
                        alert("请选择完整规格！");
                    }
                }
            });
        },
        /*分享功能*/
        shareWx: function(ids, names, groupId) {
            var url = location.href;
            var member_id = ids;
            var image_url = "http://images.cheertea.com/logonew.png";
            if(member_id != "" && member_id != undefined && member_id != null){
                var shareUrl = 'http://wx.cheertea.com/cn/groupdetail.html?groupId=' + groupId + '&memberid=' + member_id;
                Ajax({
                    types:'POST',
                    urls:'widget?type=group_activity&action=ajaxsign&ajax=yes',
                    datas:{url:url, member_id:member_id},
                    dataTypes:"json",
                    successes: function(data) {
                        var data = JSON.parse(data);

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
                        wx.ready(function(){
                            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareTimeline({
                                title: "我正在拼【" + names + "】", // 分享标题
                                desc: "大家一起来拼吧", // 分享描述
                                link: shareUrl,
                                imgUrl: image_url , // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                            // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareAppMessage({
                                title: "我正在拼【" + names + "】", // 分享标题
                                desc: "大家一起来拼吧", // 分享描述
                                link: shareUrl ,
                                imgUrl: image_url, // 分享图标
                                type: data.type, // 分享类型,music、video或link，不填默认为link
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });

                            //获取“分享到QQ”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareQQ({
                                title: "我正在拼【" + names + "】", // 分享标题
                                desc: "大家一起来拼吧", // 分享描述
                                link: shareUrl, // 分享链接
                                imgUrl: image_url, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });

                            //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                            wx.onMenuShareQZone({
                                title: "我正在拼【" + names + "】", // 分享标题
                                desc: "大家一起来拼吧", // 分享描述
                                link: shareUrl, // 分享链接
                                imgUrl: image_url, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    $(".isDelete").hide();

                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        });
                        wx.error(function(res){
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                            alert("error");
                        });
                    },
                    errors: function(){
                        alert("出现错误，连接未成功");
                    }
                })
            }
        },
        init: function() {

            //判断是否登录
            this.isLogin();

            //获取数据
            this.getAjax();

            //隐藏遮罩层
            this.detailDel();

            //点击去参团实现功能
            this.goCanTuan();
        }
    }
    groupDetail.init();
})(window, document);
