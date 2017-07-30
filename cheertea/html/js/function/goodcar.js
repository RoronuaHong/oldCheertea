var $ = require("../common/zepto");
var Ajax = require("./ajax.js");
var Popup = require("./Popup");
var goodscarnum = require("./goodscarnum");

var goodCar = module.exports = function() {
	if(this instanceof goodCar) {

	} else {
		return new goodCar();
	}
}
goodCar.prototype = {
	goodAjax: function(mainEle, dom) {
		var isClick = true;
		$(mainEle).on("tap", dom, function() {
			if(isClick) {
				isClick = false;
				this.idVal =  $(this).parents(".recommendgoodscon").attr("ids");

				/*//插入规格box
                Ajax({
                    urls: "getSpecValueListByGoodsId.action",
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        id: this.idVal
                    },
                    successes: function(data) {
                        console.log(data);
                        $("body").append(

                        );
                    }
                });*/

				/*Ajax({
					urls: "member/cart!add.do",
					types: "get",
					dataTypes: "json",
					datas: {
						goodsid: this.idVal
					},
					successes: function(data) {
						console.log(data);
						isClick = true;
						var datas = JSON.parse(data);

						if(datas.res_code == 0) {
							Popup("alert", datas.res_info).show();
						} else if(datas.res_code == 1) {
							Popup("alert", datas.res_info).show();
							goodscarnum.showCarNum();
						}
					}
				});*/
			}
		});
		return this;
	},
	specialGoodAjax: function(mainEle, dom) {
        var isClick = true;
        $(mainEle).on("tap", dom, function() {
            if(isClick) {
                isClick = false;
                this.idVal =  $(this).parents(".recommendgoodscon").attr("ids");
                this.activityId =  $(this).parents(".recommendgoodscon").attr("acid");
                this.activityPrice =  $(this).parents(".recommendgoodscon").attr("acpr");
                Ajax({
                    urls: "member/cart!add.do",
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        goodsid: this.idVal,
                        activityId: this.activityId,
                        activityPrice: this.activityPrice
                    },
                    successes: function(data) {
                        console.log(data);
                        isClick = true;
                        var datas = JSON.parse(data);

                        if(datas.res_code == 0) {
                            Popup("alert", datas.res_info).show();
                        } else if(datas.res_code == 1) {
                            Popup("alert", datas.res_info).show();
                            goodscarnum.showCarNum();
                        }
                    }
                });
            }
        });
        return this;
	}
}