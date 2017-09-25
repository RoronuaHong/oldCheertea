
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
                var roomID=this.isEarn('roomID');
                var typeName=this.isEarn('typeName');
                $('head').find('title').html(typeName);
                $.ajax({
                    url:publics+'shop/bettingMoonCake!getComRoomByRoomType.do?',
                    type:'post',
                    dataType:'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data:{
                        room_type:roomID
                    },
                    success:function (data) {
                        console.log(data);
                        var publicSignal=null;
                        $.each(data.res_data.list,function (i) {

                          if(!!data.res_data.list[i].public_signal){
                             publicSignal=encodeURIComponent(data.res_data.list[i].public_signal);
                              // console.log(publicSignal)
                          }else{
                              publicSignal='';
                          }
                          $('.roomlist').find('ul').append(
                              "<li bgUrl='"+data.res_data.list[i].back_url+"' typeName='"+data.res_data.list[i].com_name+"' publicSignal='"+publicSignal+"'>"+
                              "<img src='"+data.res_data.list[i].logo_url+"' alt=''>"+
                              "<p>"+data.res_data.list[i].com_name+"</p>"+
                              "</li>"
                          )
                      })
                    }

                });
                this.jumpUrl();
        },
        isEarn: function(name) {

            //正则判断URL是否存在当前
            var veg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substring(1).match(veg);
            if(r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },
        jumpUrl:function () {
            $('.roomlist').find('ul').on('click','li',function () {
                    var  bgUrl=$(this).attr('bgUrl');
                    var  typeName=$(this).attr('typeName');
                    var  publicSignal=$(this).attr('publicSignal');
                window.location.href ='catchmoonroom.html?bgUrl='+bgUrl+'&publicSignal='+publicSignal+'&typeName='+encodeURIComponent(typeName);
            })
        }
    };
    moonroomlist.init();
})();
