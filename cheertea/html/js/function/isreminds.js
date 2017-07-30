var $ = require("../common/zepto");

;(function() {
	var isRemind = module.exports = function() {
		if(this instanceof isRemind) {

		} else {
			return new isRemind();
		}
	}
	isRemind.prototype = {
		showIsmind: function(mainEle, text) {
			$(mainEle).css({
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: "70%",
				height: ".98rem",
				margin: "auto",
				lineHeight: ".98rem",
				background: "rgba(0,0,0,0.5)",
				fontSize: ".44rem",
				textAlign: "center",
				opacity: "0",
				color: "#fff",
				borderRadius: "2rem",
		        opacity: "1",
		        zIndex: 153,
		        transition: "background 3s linear"
		    });
			$(mainEle).html(text);
		    setTimeout(function() {
		        $(mainEle).css({
		            opacity: "0",
		            zIndex: -1,
		            transition: "all 1s linear"
		        })
		    }, 3000);
		}
	}
})();