var $ = require("../common/zepto");

var pageJump = module.exports = {
    loginJump: function(oldUrl, loginUrl) {
        window.sessionStorage.clear();
        window.sessionStorage.setItem("oldUrl", oldUrl);
        if(window.sessionStorage) {
            window.location.href = "../cn/login.html";
        }
    }
}
