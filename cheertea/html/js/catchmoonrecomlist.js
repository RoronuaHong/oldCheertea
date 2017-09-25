
;(function() {
    var $ = require("./common/zepto");
    // var Ajax = require("./function/ajax");
    require("./common/lCalendar.min");
    //共用头部
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }

    var catchmooncake= {
      init:function () {
          var _this=this;
          $.ajax({
              url:publics+"shop/bettingMoonCake!getInviterDetail.do",
              type:'post',
              xhrFields: {
                  withCredentials: true
              },
              crossDomain: true,
              dataType:'json',
              success:function (data) {
                  console.log(data);
                  var listLen=data.res_data.list.length*2;
                    $('.add-num-list').html(listLen+'次');
                    $.each(data.res_data.list,function (i) {
                        var tels=!!data.res_data.list[i].mobile && (data.res_data.list[i].mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                        var  times=new Date(data.res_data.list[i].regtime);
                        var  nowTime=_this.formatDate(times);
                             $('.re-people-list').append(
                             "<li>"+
                             "<span>"+
                             "<img src='"+data.res_data.list[i].weixin_face+"' alt='' class='banner-img'>"+
                            "</span>"+
                            "<span class='re-people-name'>"+data.res_data.list[i].uname+"</span>"+
                            "<span>"+tels+"</span>"+
                            "<span>"+nowTime+"</span>"+
                            "</li>"
                             )
                    })
              },
              error:function () {
                  console.log('数据获取失败')
              }
          })
      },
        formatDate: function (now) {
            var year= checkTime(now.getFullYear());
            var month=checkTime(now.getMonth()+1);
            var date=checkTime(now.getDate());
            return year+"-"+month+"-"+date;
            function checkTime(i){
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        }
    };
    catchmooncake.init();



})();
