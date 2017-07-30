var $ = require("../common/zepto");
var Ajax = require("./ajax");

var showBox = module.exports = function(urls) {
	// this.imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";

    if(window.location.host == "wx.cheertea.com") {
        this.imgurl = "http://images.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        this.imgurl = "http://images.cheertea.com/";
    } else {
        this.imgurl = "../images/";
    }

	$(".sisDelete").css({
		position: "fixed",
	    top: 0,
	    width: "100%",
	    height: "100%",
	    zIndex: 1002,
	    background: "rgba(0, 0, 0, 0.6)"
	});

	$(".goupbox").css({
		position: "fixed",
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    margin: "auto",
	    width: "7.13rem",
	    height: "9.53rem"
	});

	$(".goupbox .goupimg").css({
		width: "100%",
	    height: "7.66rem",
	    marginTop: "1.87rem",
	});

	$(".goupbox .chacha").css({
		position: "absolute",
	    top: 0,
	    right: 0,
	    width: "1.64rem",
	    height: "1.86rem",
	    background: "url(" + this.imgurl + "chachas.png) 0 0 no-repeat",
	    backgroundSize: "contain",
	});

	//实现弹窗功能
	function Goup() {
		this.timer = 0;
		this.timer = setTimeout(function() {
			$(".sisDelete").remove();
		}, 5000);

		$(".chacha").on("touchstart", function(event) {
			event.preventDefault();
			$(".sisDelete").hide();
			$(".goupbox").hide();
		});

		$(".sisDelete").on("touchstart", function(event) {
			event.preventDefault();
		});
	}
	Goup();

	/*实现路径功能*/
	function GetAjax() {
		Ajax({
			urls: urls,
			types: "get",
			dataTypes: "json",
			datas: {
				goodsid: this.idVal
			},
			successes: function(data) {
				var datas = JSON.parse(data);

				if(datas.isShow) {
					$('body').append(
						"<div class='sisDelete'>" +
						"<div class='goupbox'>" +
						"<a href='' class='imghref'>" +
						"<img src='' alt='' class='goupimg'>" +
						"<div class='chacha'></div>" +
						"</a>" +
						"</div>" +
						"</div>"
					);
					$(".imghref").prop("href", datas.url);
					$(".goupimg").prop("src", datas.img);
				} else {

				}
			}
		});
	}
	GetAjax();
}