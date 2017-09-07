    var $ = require("../common/zepto");

    var imgChange = module.exports = function() {
        //cdn
        //this.imgurl = "http://files.cheertea.com/statics/";

        // this.imgurl = "../images/";

        if(window.location.host == "wx.cheertea.com") {
            this.imgurl = "http://files.cheertea.com/statics/";
        } else if(window.location.host == "test.cheertea.com") {
            this.imgurl = "http://files.cheertea.com/statics/";
        } else {
            // this.imgurl = "../images/";
            this.imgurl = "http://files.cheertea.com/statics/";
        }

       if(this instanceof imgChange) {

       } else {
           return new imgChange();
       }
    }
    imgChange.prototype = {
        show: function(imgurls) {
            var _this = this;

            if(imgurls) {
                imgurls = imgurls.replace("fs:/", _this.imgurl);
            }
            return imgurls;
        }
    }

