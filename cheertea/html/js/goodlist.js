;(function() {
    var $ = require("./common/zepto");
    var goodCar = require("./function/goodcar");
    var Ajax = require("./function/ajax.js");
    var swiperFun = require("./function/swiperFun.js");
    var popup = require("./function/Popup.js");
    var goodcar = new goodCar();

    //判断用户是否登录
    //var islogin = commons.showFocus();

    var swiperfun = new swiperFun();

    var goodList = function() {
        if( this instanceof goodList) {

        } else {
            return new goodList();
        }
    }
    goodList.prototype = {
        init: function() {

            //实现购物车功能
            goodcar.goodAjax(".goodlistwrap", ".goodscar");

            function tagFun(urls, boxs, indexs,order) {
                if(!order){
                    order=5
                }
                Ajax({
                    urls: urls,
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        tag_id: indexs,
                        orderBy:order
                    },
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);
                        //绿积分
                        if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "ljfgoodlist.html") {
                            swiperfun.showLjfbox(boxs, datas.res_data.goodsList);
                        } else {
                            swiperfun.showGoodbox(boxs, datas.res_data.goodsList);
                        }

                        swiperfun.appendGoods();
                    }
                });
            }

            //绿积分
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "ljfgoodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 53);
            }

            //超值量贩
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "czlfgoodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 49);
            }
            //美肤优选
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "cosmetics-goodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 73);
            }

            //服装鞋帽
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "clothes-goodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 74);
            }

            //日化洗护
           if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "daywash-goodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 87);
            }

            //中秋套装
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "moon-goodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 85);
            }
            //中秋提货区
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "moongetgoodlist.html") {
                moonprize("goods!getGoodsListByTagId.do", ".ljfbox", 99);
            }
            //安娜妈妈
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "mother-goodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 89);
            }

            //爆款推荐
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "bktjgoodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 48);
            }

            // //新品上市
            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "xpssgoodlist.html") {
                tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 52);
            }


            //点击排序
            var defaultFlag=5;
            function sortCount() {
                $('.countsortbtn').find('li').on('click',function () {
                    $('.countsortbtn').find('li').removeClass('active');
                    $(this).addClass('active');
                    var  order=parseInt($(this).attr('order'));
                    if(order==defaultFlag){
                        return false;
                    }else{
                        defaultFlag=order;
                    }
                    $('.ljfbox').html('');

                    //美肤优选
                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "cosmetics-goodlist.html") {
                        tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 73,order);
                    }

                    //服装鞋帽
                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "clothes-goodlist.html") {
                        tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 74,order);
                    }

                    //日化洗护
                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "daywash-goodlist.html") {
                        tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 87,order);
                    }
                    //中秋提货区
                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "moongetgoodlist.html") {
                        tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 84,order);
                    }
                    //安娜妈妈
                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "mother-goodlist.html") {
                        tagFun("goods!getGoodsListByTagId.do", ".ljfbox", 89,order);
                    }

                    if(order==1){
                            $('.prize_up').removeClass('triangle_up_light');
                            $('.prize_down').addClass('triangle_down_light');
                             $(this).attr({order:2});
                    }else if(order==2){
                            $('.prize_down').removeClass('triangle_down_light');
                            $('.prize_up').addClass('triangle_up_light');
                            $(this).attr({order:1});
                    }else{
                            $('.prize_up').removeClass('triangle_up_light');
                            $('.prize_down').removeClass('triangle_down_light');
                    }


                })
            }
            sortCount();
            //中秋博饼区域切换
            moonTab();
            function moonTab() {
                var $score= $('.ljfbox').find('.score')
                $('.store-list').find('li').each(function (index) {
                    $(this).click(function () {
                        $('.store-list').find('li').removeClass('active');
                        $('.ljfbox').html('');
                        var  indexs=$(this).attr('data-num')
                        $(this).addClass('active');
                        $score.hide().eq(index).show()
                        moonprize("goods!getGoodsListByTagId.do", ".ljfbox", indexs)
                    })
                })
            }
            function moonprize(urls,boxs,indexs) {
                Ajax({
                    urls: urls,
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        tag_id: indexs
                    },
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);
                            swiperfun.showMoonBox(boxs, datas.res_data.goodsList,indexs);
                            swiperfun.appendGoods();
                    }
                });
            }
            //获取的ajax
            Ajax({
                urls: "index/index!getIndexData.do",
                types: "get",
                asyncs: true,
                dataTypes: "json",
                data: {

                },
                successes: function(data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "cjgoodlist.html") {
                        swiperfun.showGoodbox(".ljfbox", datas.res_data.teaToolsGoodsList);
                        swiperfun.appendGoods();
                    }

                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "rygoodlist.html") {
                        swiperfun.showGoodbox(".ljfbox", datas.res_data.dailyGoodsList);
                        swiperfun.appendGoods();
                    }

                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "msgoodlist.html") {
                        swiperfun.showGoodbox(".ljfbox", datas.res_data.deliciousGoodsList);
                        swiperfun.appendGoods();
                    }

                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "rmtjgoodlist.html") {
                        swiperfun.showGoodbox(".ljfbox", datas.res_data.HotGoodsList);
                        swiperfun.appendGoods();
                    }
                    if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "jhsgoodlist.html") {
                        swiperfun.showSpecialBox(".ljfbox", datas.res_data.specialGoodsList);
                        swiperfun.appendGoods();
                    }
                }
            });
            return this;
        },
        isLoginfun: function() {

            return this;
        },
        specialFun: function() {

            //特区接口
            function SpecialFun(urls, boxs, acids) {
                var acid = acids || 0;
                Ajax({
                    urls: urls,
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        activity_id: acid
                    },
                    successes: function (data) {
                        var datas = JSON.parse(data);
                        console.log(datas);

                        if(datas.res_code == 1) {
                            swiperfun.showSpecialBox(boxs, datas.res_data.goodsList);
                        }

                        if(datas.res_code == 0) {
                            popup.show("jumper", datas.res_info, "/");
                        }
                    }
                });
            }

            if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "syzqgoodlist.html") {

                //十元专区
                SpecialFun("goods!getGoodsListByActivityId.do", ".ljfbox", 12);
                swiperfun.appendGoods();
            }

            return this;
        },

    }

    var goodlist = new goodList();
    goodlist.init().isLoginfun().specialFun();
})();


