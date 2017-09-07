
;(function() {
    var $ = require("./common/zepto");
    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }

    var moonroomlist= {
        init: function () {
            $('.go-catch').on('click',function (index) {
                var roomID=$(this).attr('moonroom');
                $.ajax({
                    url:publics+'shop/bettingMoonCake!enterRoom.do',
                    type:'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType:'json',
                    data:{
                        room_id:roomID
                    },
                    success:function (data) {
                        // console.log(data)
                        if(data.res_code==1){
                            window.location.href ='catchmoonroom.html?roomID='+roomID;
                        }else if(data.res_code==-1){
                            alert(data.res_info);
                            return false
                        }
                    }
                })
            })
        }
    };
    moonroomlist.init();
})();
