var $ = require("../common/zepto");

/**
 * [Popup 弹窗]
 * @param {[type]} type [类型]
 * @param {[type]} text [文本]
 */
var Popup = module.exports = function(type, text, hrefs) {
	var o = new Object();

	o.text = text;
	o.show = function() {
		$("body").append(
			"<div class='isDeletes'>" +
				"<div class='Popupbox'>" +
					"<h1>提示</h1>" +
					"<p class='texts'></p>" +
				"</div>" +
			"</div>"
		);

		$(".isDeletes").css({
			position: "fixed",
	    	top: 0,
	    	width: "100%",
	    	height: "100%",
	    	zIndex: 1000002,
	    	background: "rgba(0, 0, 0, 0.6)"
		});
		
		$(".Popupbox").css({
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			margin: "auto",
			width: "70%",
			height: "4rem",
			background: "#fff",
			zIndex: 1500000,
			borderRadius: ".1rem"
		});

		$(".Popupbox h1").css({
			width: "92%",
			height: "1rem",
			paddingLeft: "8%",
			lineHeight: "1rem",
			fontSize: ".4rem",
			borderBottom: ".03rem solid #ff662a",
			color: "#ff662a"
		});

		$(".Popupbox .texts").css({
			width: "84%",
			height: "1.45rem",
			overflow: "hidden",
			padding: ".2rem 8%",
			fontSize: ".4rem",
			color: "#020202"
		});

		$(".texts").html(text);
		if(type == "alert") {
			$(".Popupbox").append(
				"<div class='containbtn'>确定</div>"
			);

			$(".containbtn").css({
				position: "absolute",
				left: 0,
				bottom: 0,
				width: "100%",
				height: "1rem",
				lineHeight: "1rem",
				borderTop: ".03rem solid #ff662a",
				fontSize: ".5rem",
				textAlign: "center",
				color: "#ff662a"
			});

			//点击取消
			$(".Popupbox .containbtn").on("touchend", function(event) {
				event.preventDefault();
				$(".isDeletes").remove();
			});
		}

        if(type == "jumper") {
            $(".Popupbox").append(
                "<div class='jcontainbtn'>确定</div>"
            );

            $(".jcontainbtn").css({
                position: "absolute",
                left: 0,
                bottom: 0,
                display: "block",
                width: "100%",
                height: "1rem",
                lineHeight: "1rem",
                borderTop: ".03rem solid #ff662a",
                fontSize: ".5rem",
                textAlign: "center",
                color: "#ff662a"
            });

            $(".jcontainbtn").on("touchend", function(event) {
                event.preventDefault();
            	window.location.href = hrefs;
			});
        }

		if(type == "prompt") {
			$(".Popupbox").append(
				"<div class='btnbox'>" +
					"<div class='cancelbtn'>取消</div>" +
					"<a href=" + hrefs + " class='containbtn'>确定</a>" +
				"</div>"
			);

			$(".Popupbox .btnbox").css({
				position: "absolute",
				left: 0,
				bottom: 0,
				width: "100%",
				height: "1rem",
				lineHeight: "1rem",
				fontSize: ".5rem",
				borderTop: ".03rem solid #ff662a",
				textAlign: "center"
			});

			$(".cancelbtn").css({
				float: "left",
				width: "50%",
				height: "100%",
				borderTop: ".02rem solid #ff662a",
				boxShadow: ".03rem 0 0 #ff662a",
				color: "#020202"
			});

			$(".containbtn").css({
				float: "left",
				width: "50%",
				height: "100%",
				borderTop: ".03rem solid #ff662a",
				color: "#ff662a"
			});

			//点击取消
			$(".Popupbox .cancelbtn").on("touchend", function(event) {
				event.preventDefault();
				$(".isDeletes").remove();
			});

		}
		//点击遮罩层
		$(".isDeletes").on("touchmove", function(event) {
			event.preventDefault();
		});
	}
	return o;
}