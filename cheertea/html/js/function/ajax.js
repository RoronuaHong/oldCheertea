var $ = require("../common/zepto");

//共用头部
var publics = "http://wx.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    publics = "http://wx.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    publics = "http://test.cheertea.com/";
} else {
    publics = "http://192.168.2.21:8080/zxxt_qyy/";
}

console.log(publics);
//var publics = "http://192.168.2.24:8080/zxxt_qyy/widget?";

 // var publics = "http://wx.cheertea.com/widget?";

var Ajax = module.exports = function(object) {
	$.ajax({
		url: publics + object.urls,
		xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        timeout: object.timeouts,
		type: object.types,
		async: object.asyncs,
		dataType: object.datatypes,
		jsonp: object.jsonps,
		data: object.datas,
		beforeSend: object.beforeSends,
        success: object.successes,
        error: function(data) {
        	console.log(object.urls, object.datas);
        	// alert("服务器错误！")
        },
		complete: object.completes
	});
}
