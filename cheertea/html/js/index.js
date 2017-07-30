var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var goodCar = require("./function/goodcar");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var Popup = require("./function/Popup");

//导入红包雨模块
var redpacket = require("./function/redpacket");

require("./common/touch");
require("./common/echo.js");
var goodcar = new goodCar();

//共用头部
var publics = "http://wx.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.21:8080/zxxt_qyy/";
}

//实现购物车功能
goodcar.goodAjax(".indexwrap", ".goodscar");
goodcar.specialGoodAjax(".indexwrap", ".goodscars");

var indexFun = module.exports = function() {
	var _this = this;

	this.newimgchange = new newimgChange();
	this.swiperfun = new swiperFun();

	if(this instanceof indexFun) {

	} else {
		return new indexFun();
	}
}
indexFun.prototype = {
	constructor: indexFun,
	init: function() {
		var _this = this;

		$(document).ready(function() {
			showbox("widget?type=popup_window&ajax=yes&action=get");

			//首页接口
			Ajax({
				urls: "index/index!getIndexData.do",
				types: "get",
				dataTypes: "json",
				successes: function(data) {
					var datas = JSON.parse(data);
					console.log(datas);

					//首页轮播
					_this.swiperfun.showBanner(".newimgchangebox", datas.res_data.advList);
					_this.newimgchange.loadBanner('#newimgchange', 3000, true, 1);

					//绿积分专区
					_this.swiperfun.showLjf(".ljf-twopatherbox", datas.res_data.greenSectionGoodsList
					);


					for(var i = 0; i < $(".ljf-twopatherbox").find(".swiper-slide").length; i++) {
                        ($(".ljf-twopatherbox").find(".swiper-slide").eq(i).find(".newprice").html()).replace(/￥/gi, "绿积分");
					}

					//超值量贩
					_this.swiperfun.showTwopath(".czlf-twopatherbox", datas.res_data.czlfgoodsList);

					//爆款推荐
					_this.swiperfun.showTwopath(".bktj-twopatherbox", datas.res_data.bktjgoodsList);



					//滑动效果
					_this.newimgchange.loadPath('.twopaths', false, 2.5);

					//茶具
					_this.swiperfun.showGoodbox(".cj-goodbox", datas.res_data.teaToolsGoodsList);

					//茗茶
					_this.swiperfun.showGoodbox(".mc-goodbox", datas.res_data.teasGoodsList);

					//日用
					_this.swiperfun.showGoodbox(".ry-goodbox", datas.res_data.dailyGoodsList);

					//美食
					_this.swiperfun.showGoodbox(".ms-goodbox", datas.res_data.deliciousGoodsList);

					//热门推荐
					_this.swiperfun.showGoodbox(".rmtj-goodbox", datas.res_data.HotGoodsList);

                    //巨省钱
                    _this.swiperfun.showSpecialBox(".jsq-goodbox", datas.res_data.specialGoodsList);

					//变色推荐
					_this.swiperfun.showFourpath(".changecon", datas.res_data.showIndexCatList);
					_this.newimgchange.loadPath('#changegoods', true, 4);

					/*实现背景颜色的替换功能*/
					function ChangeColors() {
						this.lengths = $(".changecon .swiper-wrapper .swiper-slide").length;
						for (var i = 0; i < this.lengths; i++) {
							if (i % 4 == 0) {
								$(".changecon .swiper-wrapper .swiper-slide").eq(i).find(".changgoodscontents").css("background", "#e1faf3").find("span").css("color", "#048e38");
							}
							if (i % 4 == 1) {
								$(".changecon .swiper-wrapper .swiper-slide").eq(i).find(".changgoodscontents").css("background", "#e6f7fe").find("span").css("color", "#208cb8");
							}
							if (i % 4 == 2) {
								$(".changecon .swiper-wrapper .swiper-slide").eq(i).find(".changgoodscontents").css("background", "#f7f4fb").find("span").css("color", "#9d6edc");
							}
							if (i % 4 == 3) {
								$(".changecon .swiper-wrapper .swiper-slide").eq(i).find(".changgoodscontents").css("background", "#faf5ee").find("span").css("color", "#e7a119");
							}
						}
					}
					ChangeColors();
                    Echo.init({
                        offset: 200,
                        throttle: 0
                    });
				}
			});

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
                            _this.swiperfun.showSpecialBox(boxs, datas.res_data.goodsList);
						}
                        Echo.init({
                            offset: 200,
                            throttle: 0
                        });
                    }
                });
			}

            //十元专区
            SpecialFun("goods!getGoodsListByActivityId.do", ".syzq-goodbox", 12);

            /*//520专题
            SpecialFun("goods!getGoodsListByActivityId.do", ".zty-twopatherbox", 24);*/

            function tagFun(urls, boxs, indexs, showbox) {
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
                        _this.swiperfun[showbox](boxs, datas.res_data.goodsList);
                        _this.swiperfun.appendGoods();
                    }
                });
            }

            //新品上市
            tagFun("goods!getGoodsListByTagId.do", ".xpss-goodbox", 52, "showGoodbox");

            //美肤优选
            tagFun("goods!getGoodsListByTagId.do",".cosmetics-twopatherbox", 73, "showTwopathLimit");

            //620兑奖
            tagFun("goods!getGoodsListByTagId.do", ".zty-twopatherbox", 68, "showPrizebox");

            $(".pkcha").on("touchend", function(event) {
                event.preventDefault();
                $(".pkbox").hide();
            });
		});

		//导入红包雨
        Ajax({
            urls: "activity!getPromotionActivityDetails.do",
            types: "get",
            dataTypes: "json",
            datas: {
                promotionActivityId: 2
            },
            successes: function (data) {
                var datas = JSON.parse(data);
                console.log(datas);

                var nowTime = +new Date();
                console.log(nowTime - datas.res_data.promotionActivity.begin_time);
                console.log(nowTime - datas.res_data.promotionActivity.end_time);
                if(nowTime >= datas.res_data.promotionActivity.begin_time && nowTime <= datas.res_data.promotionActivity.end_time) {
                	datas.res_data.promotionActivity.enable == 1 && redpacket.init();

                    var islogin = islogins.showFocus();

                    !islogin && Popup("jumper", "请登录！", publics + "login.html?forward=member_index.html").show();
                }
            }
        });
        return this;
	},
	wheelfun: function() {
		$(".hotspot .innerbox").append($(".hotspot .innerbox").html());

		$(".hotspot .innerbox").css({
			width: $(".hotspot .innerbox").width() * $(".hotspot .innerbox li").length
		});

		//实现水平滑动
		var _this = this;
		this.speed = 0;
		this.timer = 0;
		this.timer = setInterval(function() {
			_this.speed++;
			//console.log(_this.speed);
			$(".hotspot .outerbox").scrollLeft(_this.speed);
			if(_this.speed >= $(".hotspot li").width()) {
				_this.speed = 0;
			}
		}, 70);
		return this;
	},
	showTowpaher: function() {
		var _this = this;
		$(".outerboxcontent").load("../template/banner/killpather.html", function() {
			_this.newimgchange.loadPath('#secondkill', true, 1);
		});
		return this;
	},
	addPoints: function() {
		$(".addPoint").on("touchstart", function() {
			Ajax({
				urls: "member/login!addGreenPoint.do",
				dataTypes: "json",
				successes: function(data) {
					var datas = JSON.parse(data);
					console.log(datas);
					if (datas.res_code == 1) {
                        Popup("alert", datas.res_info).show();
					} else {
						if(datas.res_code == 2) {
							// $(".indexwrap .qrcodeimgbox").show();
							// $(".indexwrap .isDelete").show();
                            !!$(".qrcodeimgbox") && $(".qrcodeimgbox").remove();
                            $(".indexwrap").append("<div class='qrcodeimgbox'><img src='http://images.cheertea.com/qyy.png' alt=''><span>请关注公众号</span></div>");

							$(".indexwrap .qrcodeimgbox").css({
								position: "fixed",
								width: "5.2rem",
								height: "5.2rem",
								left: "2.4rem",
								top: "5rem",
								margin: "0 auto",
								zIndex: 200
							});
                            $(".indexwrap .qrcodeimgbox img").css({
                                display: "block",
								width: "5.2rem",
								height: "5.2rem",
								margin: "0 auto",
								zIndex: 250
                            });
                            $(".indexwrap .qrcodeimgbox span").css({
                                display: "inline-block",
								width: "100%",
								height: ".8rem",
								lineHeight: ".8rem",
								fontSize: ".5rem",
								textAlign: "center",
								color: "#fff"
                            });

							// $("body").append("<meta content='width=device-width, initial-scale=1, maximum-scale=1.01, user-scalable=no' name='viewport'/>");
							$(".qrcodeimgbox span").html("长按关注领取绿积分");
						} else {
                            // Popup("alert", "您尚未登录，请登录！").show();
							// window.location.href = data.message;
							alert("您尚未登录，请登录！");
                            // window.location.href = "http://wx.cheertea.com/login.html?forward=member_index.html";
						}
					}
                    Echo.init({
                        offset: 200,
                        throttle: 0
                    });
				}
			})
		});
	}
}

var indexfun = new indexFun()
indexfun.init().showTowpaher().wheelfun().addPoints();
