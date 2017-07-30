var $ = require("./common/zepto");
var Ajax = require("./function/ajax.js");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();

require("./common/touch");

var imgurl = "http://images.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else {
    imgurl = "../images/";
}
console.log(imgurl)

var classiFy = function() {
	if(this instanceof classiFy) {
		console.log($(".goodscon").height(), $(".header").height());
	} else {
		return new classiFy();
	}
}
classiFy.prototype = {
	init: function() {
		function getAjaxs(mainEle, indexs) {
			var catid = $(mainEle).eq(indexs).attr("ids");
			console.log(catid)
			Ajax({
				urls: "widget?type=product_category&ajax=yes&action=getCatData",
				types: "get",
				asyncs: true,
				dataTypes: "json",
				datas: {
					cat_id: catid
				},
				beforeSend: {

				},
				successes: function(data) {
					var datas = JSON.parse(data);
					console.log(datas);

					//生成头部与内容关系的json
					$(".rightcon").children().remove();
					$.each(datas.catList, function(i) {
						$(".rightcon").append(
							"<div class='goodscontent'>" +
								"<div class='title' catid='" + datas.catList[i].cat_id + "'>" +
									"<strong></strong>" +
									"<span>" + datas.catList[i].name + "</span>" +
									"<a href=''></a>" +
								"</div>" +
								"<div class='goodscon clearfix'>" +

								"</div>" +
							"</div>"
						);
						$.each(datas.childrenLists, function(k) {
							if(datas.catList[i].cat_id == datas.childrenLists[k].parent_id) {
								$(".goodscontent").eq(i).find(".goodscon").append(
									"<a href='http://wx.cheertea.com/search-cat-" + datas.childrenLists[k].cat_id + "-.html'>" +
										"<img src='" + imgchange.show(datas.childrenLists[k].image) + "' alt=''>" +
										"<span>" + datas.childrenLists[k].name + "</span>" +
									"</a>"
								);
							}
						});
					});
				}
			});
		}
		Ajax({
			urls: "widget?type=product_category&ajax=yes&action=getCatPageData",
			types: "get",
			asyncs: true,
			dataTypes: "json",
			successes: function(data) {
				var datas = JSON.parse(data);
				console.log(datas);

				$.each(datas.catList, function(i) {
					$(".leftmenu").append(
						"<li ids=" + datas.catList[i].cat_id + ">" + datas.catList[i].name + "</li>"
					);
					$(".leftmenu li").eq(0).addClass("liselected");
				});

				//获取默认的请求
				getAjaxs(".leftmenu li", 0);

				$(".leftmenu").on("tap", "li", function() {
					$(this).addClass("liselected").siblings("li").removeClass("liselected");
					getAjaxs(".leftmenu li", $(this).index());
				});
			}
		});

		return this;
	},
	goodTabchange: function() {
		$(".leftmenu").find("li").tap(function() {
	        $(this).addClass("liselected").siblings("li").removeClass("liselected");
        });

        /*实现分类切换功能*/
		$(".leftmenu li").eq(0).addClass("liselected");
		$(".leftmenu a").tap(function() {
		    var url = $(this).attr('data-url');
		    $('#huiChangLoad').load(url, function() {
		        this.len = $(".classificationofgoodswrap .rightcon .goodscontent").length;
		        $(".classificationofgoodswrap .rightcon .goodscontent").eq(this.len - 1).css({
		            paddingBottom: 1.39 + "rem"
		        });
		        $(".leftmenu").find("a").tap(function() {
		            $(this).parent("li").addClass("liselected").siblings("li").removeClass("liselected");
		        });
		    });
		});
		return this;
	},
	newHeight: function() {
		console.log($("body").height(), $(".header").height());
        $(".classificationofgoodswrap .rightcon").css({
	        height: ($(window).height() - ($(".header").height() + $(".homefooter").height()) - 10 + "px")
	    });
	    $(".classificationofgoodswrap .leftmenu").css({
	        height: ($(window).height() - ($(".header").height() + $(".homefooter").height()) - 10 + "px")
	    });
	    return this;
	}
}
var classify = new classiFy();
classify.init().goodTabchange().newHeight();