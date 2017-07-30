;(function() {
    var $ = require("./common/zepto");
    var imgurl = "http://images.cheertea.com/";

    require("./common/flexible")

    $.each($("body").find("img"), function(i) {
        $("body").find("img").eq(i).attr("src", ($("body").find("img").eq(i).attr("src")).replace("../", imgurl));
    });
    //var Common = require('./common/common');

    $("body").on("touchmove", function(event) {
        event.preventDefault();
    });

    $("body").on("touchstart", function(event) {
        event.preventDefault();
    });
})();