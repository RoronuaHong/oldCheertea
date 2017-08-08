var $ = require("../common/zepto");
var imgChange = require("../function/imgchange");
var imgchange = new imgChange();

var imgurl = "http://images.cheertea.com/";

if(window.location.host == "wx.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else {
    imgurl = "../images/";
}
console.log(imgurl)

var swiperFun = module.exports = function() {
	if(this instanceof swiperFun) {

	} else {
		return new swiperFun();
	}
}
swiperFun.prototype = {
	showBanner: function(names, datas) {
		$(names).append(
			"<div class='swiper-container' id='newimgchange'>" +
				"<div class='swiper-wrapper'>" +
				"</div>" +
				"<div class='swiper-pagination'></div>" +
			"</div>"
		);
		$.each(datas, function(i) {
			$(names).find(".swiper-wrapper").append(
				"<div class='swiper-slide'>" +
					"<a href=" + datas[i].url + ">" +
						"<img src=" + imgchange.show(datas[i].atturl) + " alt=''>" +
					"</a>" +
				"</div>"
			);
		});
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
    showBanner1: function(names, datas) {
        $(names).append(
            "<div class='swiper-container' id='newimgchange'>" +
                "<div class='swiper-wrapper'>" +
                "</div>" +
                "<div class='swiper-pagination'></div>" +
            "</div>"
        );
        $.each(datas, function(i) {
            $(names).find(".swiper-wrapper").append(
                "<div class='swiper-slide'>" +
                    "<img src=" + imgchange.show(datas[i].big) + " alt=''>" +
                "</div>"
            );
        });
        Echo.init({
            offset: 200,
            throttle: 0
        });
    },
	showTwopath: function(names, datas) {
		$(names).append(
			"<div class='swiper-container twopaths'>" +
				"<div class='swiper-wrapper'>" +
				"</div>" +
			"</div>"
		);
		$.each(datas, function(i) {
			$(names).find(".swiper-wrapper").append(
				"<div class='swiper-slide'>" +
					"<div class='two-pathcon' ids=" + datas[i].goods_id + ">" +
						"<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
							"<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
							"<span class='contents'>" +
								"<p class='two-title'>" + datas[i].name + "</p>" +
								"<div class='two-price clearfix'>" +
									"<span class='newprice'>￥<strong>" + datas[i].price + "</strong>.00</span>" +
								"</div>" +
							"</span>" +
						"</a>" +
					"</div>" +
				"</div>"
			);
		});
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
    showTwopathLimit: function(names, datas,url) {
	    var index=0;
        $(names).append(
            "<div class='swiper-container twopaths'>" +
            "<div class='swiper-wrapper'>" +
            "</div>" +
            "</div>"
        );
        $.each(datas, function(i) {
            if(index<6){
                $(names).find(".swiper-wrapper").append(
                    "<div class='swiper-slide'>" +
                    "<div class='two-pathcon' ids=" + datas[i].goods_id + ">" +
                    "<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
                    "<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
                    "<span class='contents'>" +
                    "<p class='two-title'>" + datas[i].name + "</p>" +
                    "<div class='two-price clearfix'>" +
                    "<span class='newprice'>￥<strong>" + datas[i].price + "</strong>.00</span>" +
                    "</div>" +
                    "</span>" +
                    "</a>" +
                    "</div>" +
                    "</div>"
                );
                index++;
            }

        });
        $(names).find(".swiper-wrapper").append(
            "<div class='swiper-slide'>" +
            "<div class='two-pathcon'>" +
            "<a href='" + url + "'>" +
            "<img src='" + imgurl + "/cosmetics-more.png' alt=''>" +
            "</a>" +
            "</div>" +
            "</div>"
        );
        Echo.init({
            offset: 200,
            throttle: 0
        });
    },
	showGoodbox: function(names, datas) {
		$(names).append(
			"<div class='recommendgoods clearfix'></div>"
		);
		$.each(datas, function(i) {
			var imgs = datas[i].image || datas[i].original;
            $(names).find(".recommendgoods").append(
				"<div class='recommendgoodscon' ids=" + datas[i].goods_id + ">" +
                	"<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
						"<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
					"</a>" +
					"<div class='goodsmessage'>" +
						"<div class='messages'>" +
							"<p>" + datas[i].name + "</p>" +
							"<span>￥<em>" + datas[i].price + "</em>.00</span>" +
						"</div>" +
						/*"<div class='goodscar'></div>" +*/
					"</div>" +
				"</div>"
			);
		});

        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
    showPrizebox: function(names, datas) {
        $(names).append(
            "<div class='recommendgoods clearfix'></div>"
        );
        $.each(datas, function(i) {
            var imgs = datas[i].image || datas[i].original;
            $(names).find(".recommendgoods").append(
                "<div class='recommendgoodscon' ids='" + datas[i].goods_id + "'>" +
                "<a href='/cn/product_info.html?showprize=2&goods_id=" + datas[i].goods_id + "'>" +
                "<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
                "</a>" +
                "<div class='goodsmessage'>" +
                "<div class='messages'>" +
                "<p>" + datas[i].name + "</p>" +
                "<span>￥<em>" + datas[i].price + "</em>.00</span>" +
                "</div>" +
                /*"<div class='goodscar'></div>" +*/
                "</div>" +
                "</div>"
            );
        });
        Echo.init({
            offset: 200,
            throttle: 0
        });
    },
	showSpecialBox: function(names, datas) {
        $(names).append(
            "<div class='recommendgoods clearfix'></div>"
        );
        $.each(datas, function(i) {
            var imgs = datas[i].image || datas[i].original;
            var prices = datas[i].activity_price || datas[i].price;
            var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id;
            if(datas[i].activity_id) {
                links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + "&activity_id=" + datas[i].activity_id;
			}

            $(names).find(".recommendgoods").append(
                "<div class='recommendgoodscon' ids=" + datas[i].goods_id + " acid='" + datas[i].activity_id + "' acpr='" + datas[i].activity_price + "'>" +
                "<a href='" + links + "'>" +
                "<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
                "</a>" +
                "<div class='goodsmessage'>" +
                "<div class='messages'>" +
                "<p>" + datas[i].name + "</p>" +
                "<span>￥<em>" + prices + "</em>.00</span>" +
                "</div>" +
                /*"<div class='goodscars'></div>" +*/
                "</div>" +
                "</div>"
            );
        });
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
    showSpeshopbox: function(names, datas) {
        $.each(datas, function(i) {
            var imgs = datas[i].image || datas[i].original;
            var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id;
            $(names).append(
            	"<a href='" + links + "'>" +
					"<div class='speli clearfix'>" +
						"<img src='" + imgchange.show(imgs) + "' alt='' class='speimg'>" +
						"<div class='rightcon'>" +
							"<h3>" + datas[i].name + "</h3>" +
							"<p class='price'>市场价<span>" + datas[i].mktprice + "</span>元</p>" +
							"<p class='nowprice'>惊购价￥<span>" + datas[i].price + "</span></p>" +
						"</div>" +
					"</div>" +
            	"</a>"
			);
        });
	},
    showLjfbox: function(names, datas) {
        $(names).append(
            "<div class='recommendgoods clearfix'></div>"
        );
        $.each(datas, function(i) {
            var imgs = datas[i].image || datas[i].original;
            $(names).find(".recommendgoods").append(
                "<div class='recommendgoodscon' ids=" + datas[i].goods_id + ">" +
                	"<a href='/cn/product_info.html?ljf=1&goods_id=" + datas[i].goods_id + "'>" +
                		"<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
					"</a>" +
					"<div class='goodsmessage'>" +
						"<div class='messages'>" +
                			"<p>" + datas[i].name + "</p>" +
                			"<span>绿<em>" + datas[i].price + "</em>.00分</span>" +
                		"</div>" +
                		/*"<div class='goodscar'></div>" +*/
                	"</div>" +
					"<div class='messagess'>" +
						"<span>￥<em>" + datas[i].price + "</em>.00</span>" +
					"</div>" +
                "</div>"
            );
        });
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
    // 养身馆
    Yangsbox: function(names, datas) {
        $.each(datas, function(i) {
            if(i < 6) {
                var imgs = datas[i].image || datas[i].original;
                var prices = datas[i].activity_price || datas[i].price;
                var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + ".html";
                if(datas[i].activity_id) {
                    links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + "&activity_id=" + datas[i].activity_id;
                }

                $(names).append(
                    "<div class='three-pathcon' ids='" + datas[i].goods_id + "'>" +
                    "<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
                    "<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
                    "<span class='contents'>" +
                    "<p class='three-title'>" + datas[i].name + "</p>" +
                    "<div class='three-price clearfix'>" +
                    // "<span class='newprice'>绿<strong>" + prices + "</strong>.00分</span>" +
                    "</div>" +
                    "<div class='messages'>" +
                    "<span>￥<em>" + prices + "</em>.00</span>" +
                    "</div>" +
                    "</span>" +
                    "</a>" +
                    "</div>"
                );
            }
        });
        Echo.init({
            offset: 200,
            throttle: 0
        });
    },
	showLjf: function(names, datas) {
        $.each(datas, function(i) {
        	if(i < 6) {
                var imgs = datas[i].image || datas[i].original;
                var prices = datas[i].activity_price || datas[i].price;
                var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id;
                if(datas[i].activity_id) {
                    links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + "&activity_id=" + datas[i].activity_id;
                }

                $(names).append(
                    "<div class='three-pathcon' ids=" + datas[i].goods_id + ">" +
                    "<a href='/cn/product_info.html?ljf=1&goods_id=" + datas[i].goods_id + "'>" +
                    "<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
                    "<span class='contents'>" +
                    "<p class='three-title'>" + datas[i].name + "</p>" +
                    "<div class='three-price clearfix'>" +
                    "<span class='newprice'>绿<strong>" + prices + "</strong>.00分</span>" +
                    "</div>" +
                    "<div class='messages'>" +
                    "<span>￥<em>" + prices + "</em>.00</span>" +
                    "</div>" +
                    "</span>" +
                    "</a>" +
                    "</div>"
                );
			}
        });
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
	showFourpath: function(names, datas) {
		$(names).append(
			"<div class='swiper-container swiper-container-horizontal' id='changegoods'>" +
				"<div class='swiper-wrapper'>" +
				"</div>" +
			"</div>"
		);
		$.each(datas, function(i) {
			$(names).find(".swiper-wrapper").append(
				"<div class='swiper-slide'>" +
            "<div class='changgoodscontents'>" +
            "<a href=http://wx.cheertea.com/search-cat-" + datas[i].catId + "-.html>" +
            "<span>" + datas[i].catName + "</span>" +
            "<em class='trodition'>" + datas[i].catDesc + "</em>" +
            "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(datas[i].img) + " alt=''>" +
            "</a>" +
            "</div>" +
            "</div>"
			);
		});
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
	sortTwo: function(names, datas){
		$.each(datas,function(i){
			$(names).append(
				"<dl>"+
					"<dt>"+
						"<a href=''>" +
							"<img src=" + imgurl + "'logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>"+
						"</a>" +
					"</dt>" +
					"<dd class='t1'>" +
						"<a href=''>" + datas[i].name +"</a>"+
					"</dd>" +
					"<dd class='t2'>" +
						"<div class='fl'>" +
							"<em>已完成：</em>" + "<i>" + datas[i].goods_id + "</i>"+
						"</div>" +
						"<div class='fr'>"+
							"<a href=''>"+datas[i].goods_id+"</a>"+
						"</div>"+
					"</dd>" +
					"<dd class='t3'>"+
						"<span style='width:"+ datas[i].mktprice +"%" +"'></span>'"+
					"</dd>" +
				"</dl>"
			)
		});
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
	newsUp:function(names, datas){
		$(names).append(
			"<div class='swiper-container' id='i-news'>" +
           	   "<div class='swiper-wrapper'>" +
           	   "</div>" +
            "</div>"
            );
		$.each(datas,function(i){
			$(names).find(".swiper-wrapper").append(
				"<div class='swiper-slide'>" +  datas[i].name + "</div>"
			)
		});
        Echo.init({
            offset: 200,
            throttle: 0
        });
	},
	showArea: function(names, datas) {

	},
 	showShop: function(names, datas, small) {
		$.each(datas, function(i) {
            var imgs = datas[i].com_image ? imgchange.show(datas[i].com_image) : "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg";
            $(".shopcontentbox").append(
				"<div class='shopcontent'>" +
					"<a href='http://wx.cheertea.com/wxshop-" + datas[i].com_id + ".html'>" +
						"<div class='shop-con'>" +
							"<div class='shoptitle clearfix'>" +
								"<img src='" + imgs + "' alt=''>" +
								"<div class='names'>" +
									"<span class='shopname'>" + datas[i].com_name +"</span>" +
								"</div>" +
								"<span class='entershop'>进入店铺</span>" +
							"</div>" +
						"</div>" +
					"</a>" +
					"<div class='logobanner'>" +
						"<a href=''>" +
							"<img data-src='" + imgchange.show(datas[i].com_banner) + "' src='../logobanner1.png' alt=''>" +
						"</a>" +
					"</div>" +
					"<div class='twopathcontent'>" +
						"<div class='swiper-container' id='shoptwopaths'>" +
							"<div class='swiper-wrapper'>" +

                			"</div>" +
                		"</div>" +
               		 "</div>" +
                "</div>"
			);

			$.each(datas[i][small], function(j) {
                $(".shopcontent").eq(i).find(".twopathcontent .swiper-wrapper").append(
					"<div class='swiper-slide'>" +
						"<div class='two-pathcon'>" +
							"<a href=''>" +
								"<img data-src='" + imgchange.show(datas[i][small][j].small) + "' src='../logobanner1.png' alt=''>" +
								"<span class='contents'>" +
									"<p class='two-title'>" + datas[i][small][j].name + "</p>" +
									"<div class='two-price clearfix'>" +
										"<span class='newprice'>￥<strong>" + datas[i][small][j].price + "</strong></span>" +
									"</div>" +
								"</span>" +
							"</a>" +
						"</div>" +
					"</div>"
				);
            });
		});
	},

 	appendGoods: function() {
		console.log($(".recommendgoods"));
	}
}