var $ = require("./common/zepto");
var imgChange = require("./function/imgchange");
var Ajax = require("./function/ajax");
var imgchange = new imgChange();
var islogins = require("./function/isLogin");
var goodscarnum = require("./function/goodscarnum");

require("./common/flexible");
require("./common/touch");
require("./common/echo.js");

if(window.location.host == "wx.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else {
    imgurl = "../images/";
}

var Common = module.exports = function() {
	//cdn
	//  this.imgurl = "http://images.cheertea.com/";
	  //this.cssurl = "http://css.cheertea.com/";

	//本地
	// this.imgurl = "../images/";

	if(this instanceof Common) {

	} else {
		return new Common();
	}
}
Common.prototype = {
	constructor: Common,
	init: function() {
		var _this = this;

		window.onload = function() {

			//修改img路径
			$.each($("body").find("img"), function(i) {
				$("body").find("img").eq(i).attr("src", ($("body").find("img").eq(i).attr("src")).replace("../", imgurl));

				if($("body").find("img").eq(i).attr("data-src")) {
					$("body").find("img").eq(i).attr("data-src", ($("body").find("img").eq(i).attr("data-src")).replace("../", imgurl));
				}
			});

			$("body").show();

			//实现底部购物车数字显示
			goodscarnum.showCarNum();
		}

        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?6859ce5aaf00fb00387e6434e4fcc925";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();

        return this;
	},
	returnTop: function() {
		$("body").append(
			"<div class='returntopandpagesum'>" +
				"<em></em>" +
				"<div class='pagesums'>" +
					"<p></p>" +
					"<span></span>" +
				"</div>" +
			"</div>"
		);

		function ShowPage() {

			//当前显示页数
			$(".returntopandpagesum .pagesums").find("p").html(parseInt(($("body").scrollTop() + $(window).height()) / $(window).height()));

			//获取总高度
			$(".returntopandpagesum .pagesums").find("span").html(parseInt($(document).height() / $(window).height()));
		}
		ShowPage();

		//返回顶部与显示页数
		function ReturnTop() {
			var top_this = this;
			this.isTrue = true;

			$(window).scroll(function() {
				var _this = this;

				this.startVal = $(window).scrollTop();

				this.timer = setInterval(function() {

					this.endVal = $(window).scrollTop();
					if (_this.startVal == this.endVal && top_this.isTrue == true) {
						clearInterval(_this.timer);
						if ($(window).scrollTop() >= $(window).height()) {
							$(".returntopandpagesum").find("em").show().css("display", "block");
						}
					}
				}, 500)
				if ($(window).scrollTop() <= $(window).height()) {
					$(".returntopandpagesum").find("em").hide();
				}
			})

			//返回顶部
			$(".returntopandpagesum").on("touchstart", "em", function(event) {
				$("body").scrollTop(0);
			});

			//触摸移动时显示页数，停止时显示返回顶部
			$("body").on("touchmove", function() {

				top_this.isTrue = false;

				//设置当前页数和总页数
				new ShowPage();

				//显示页数
				$(".returntopandpagesum").find(".pagesums").show();

				//隐藏返回顶部
				$(".returntopandpagesum").find("em").hide();

				$("body").on("touchend", function() {

					//隐藏页数
					$(".returntopandpagesum").find(".pagesums").hide();

					//显示返回顶部
					if ($("body").scrollTop() >= $(window).height()) {
						$(".returntopandpagesum").find("em").show().css("display", "block");
					}
				})
			})

			$("body").on("touchend", function() {
				top_this.isTrue = true;

				//隐藏页数
				$(".returntopandpagesum").find(".pagesums").hide();

				//显示返回顶部
				if ($("body").scrollTop() >= $(window).height()) {
					$(".returntopandpagesum").find("em").show().css("display", "block");
				}
			})
		}
		ReturnTop();
		return this;
	},
	lazyLoad: function() {
		Echo.init({
			offset: 200,
			throttle: 0
		});
		return this;
	},
	loadFooter: function() {
		if($(".homefooter")) {
			$(".homefooter").load("../template/common/footer.html", function() {
				if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "indexs.html" || (window.location.href).split("/")[(window.location.href).split("/").length - 1] == "index.html?islogin=no" || window.location.href == "http://wx.cheertea.com/" || window.location.href == "http://wx.cheertea.cn/" || ((window.location.pathname).split("?")[0]).split("/")[((window.location.pathname).split("?")[0]).split("/").length - 1] == "index.jsp") {
					$(".footerlab li").eq(0).css({
						background: "url(" + imgurl + "footerbg11.png) center .1rem no-repeat",
						backgroundSize: "50%"
					}).find("a").addClass("selected");
				} else if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "classificationOfGoods.html") {
					$(".footerlab li").eq(1).css({
						background: "url(" + imgurl + "footerbg22.png) center .1rem no-repeat",
						backgroundSize: "50%"
					}).find("a").addClass("selected");
				} else if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "goodscar.html") {
					$(".footerlab li").eq(2).css({
						background: "url(" + imgurl + "footerbg33.png) center .1rem no-repeat",
						backgroundSize: "50%"
					}).find("a").addClass("selected");
				} else if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "personcenter.html") {
					$(".footerlab li").eq(3).css({
						background: "url(" + imgurl + "footerbg44.png) center .1rem no-repeat",
						backgroundSize: "50%"
					}).find("a").addClass("selected");
				} else if((window.location.href).split("/")[(window.location.href).split("/").length - 1] == "newgroup.html") {
					$(".ptbtn").css({
                        background: "url(http://images.cheertea.com/ptgif2.png) 0 0 no-repeat",
                        backgroundSize: "contain"
					});
				}
			});
		}
		return this;
	},
	showLogin: function() {
		//判断用户是否登录
		var islogin = islogins.showFocus();
		$("body").on("tap", function(event) {
			if($(event.target).hasClass("personcenter")) {
				if(islogin) {
					window.location.href = window.location.pathname;
				} else {
					window.location.href = "cn/login.html?forward=" + window.location.pathname;
				}
			}
		});
		return this;
	}
};

var common = new Common();
common.init().loadFooter().returnTop().showLogin();
setTimeout(function() {
	common.lazyLoad();
}, 2000);