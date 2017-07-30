;(function() {
    var $ = require("./common/zepto");
    var Ajax = require("./function/ajax");

    var shopDetail = {
        ajaxFun: function() {
            Ajax({
                urls: "businessCircle!getAllianceBusinessById.do",
                types: "post",
                dataTypes: "json",
                datas: {
                    allianceBusinessId: (window.location.href).split("?")[1]
                },
                successes: function (data) {
                    var datas = JSON.parse(data);
                    console.log(datas);

                    if(datas.res_code == 1) {

                        //填入数据
                        $(".position").html(datas.res_data.allianceBusiness.business_address);
                        $(".otherdet li").eq(0).find(".tail").html(datas.res_data.allianceBusiness.business_mobile);
                    }
                    if(datas.res_code == -1) {
                        window.location.href = "../cn/newshopnear.html";
                    }
                }
            });
        },
        tabChanges: function() {
            $(".shopdetailtit li").on("tap", function() {
                $(this).addClass("lisel").siblings("li").removeClass("lisel");
                $(".shopdetailcon .con").eq($(this).index()).show().siblings(".con").hide();
            });
        },
        init: function() {

            //使用ajax初始数据
            this.ajaxFun();

            //实现tab切换
            this.tabChanges();
        }
    }
    shopDetail.init();
})();
