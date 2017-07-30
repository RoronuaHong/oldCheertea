var $ = require("./common/jquery.min");

var Vipupgrate = function() {
	if(this instanceof Vipupgrate) {

	} else {
		return new Vipupgrate();
	}
}
Vipupgrate.prototype = {
	vipSlideupdown: function() {
		$(".vipupgratewrap .details").on("touchstart", function() {
	        $(this).parents(".vipchild").siblings('.showmessage').slideToggle("fast");
	    });
	    return this;
	},
	vipGoods: function() {
		$(".vippaysuccesswrap .goodselect").on("touchstart", function() {
	        $(this).addClass("goodselected").siblings("input").attr("checked", "checked").parents(".recommendgoodscon").siblings(".recommendgoodscon").find(".goodselect").removeClass("goodselected").siblings("input").attr("checked", "");
	    });
	    return this;
	}
}

var vipupgrate = new Vipupgrate();
vipupgrate.vipSlideupdown().vipGoods();