var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var newimgchange = new newimgChange();

var newShop = function() {

}
newShop.prototype = {
	showTowpaher: function() {
		$(".twopathcontent").load("../template/banner/twopather.html", function() {
			newimgchange.loadPath('.twopaths', true, 2.5);
		});
	}
}

var newshop = new newShop();
newshop.showTowpaher();