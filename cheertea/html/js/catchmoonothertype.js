
;(function() {

    var $ = require("./common/zepto");
    require('./common/fastclick');
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var moonothertype={
        init:function () {
            var goJoin=$('.go-join');
            $.ajax({
                url:publics+'shop/bettingMoonCake!showOtherActivity.do',
                type:'post',
                dataType:'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success:function (data) {
                    console.log(data);
                    $.each(data.res_data.activity_list,function(i){
                        if(data.res_data.activity_list[i].activity_id==2){
                            goJoin.eq(0).find('a').addClass('active');
                        }
                        if(data.res_data.activity_list[i].activity_id==3){
                            goJoin.eq(1).find('a').addClass('active');
                        }
                        if(data.res_data.activity_list[i].activity_id==7){
                            goJoin.eq(2).find('a').addClass('active');
                        }
                        if(data.res_data.activity_list[i].activity_id==8){
                            goJoin.eq(3).find('a').addClass('active');
                        }
                        if(data.res_data.activity_list[i].activity_id==4){
                            goJoin.eq(4).find('a').addClass('active');
                        }
                        if(data.res_data.activity_list[i].activity_id==9){
                            goJoin.eq(5).find('a').addClass('active');
                        }
                    })
                }
            });
            $('.myprize-list').find('.join').each(function (index,item) {
                        $(item).click(function () {
                            // console.log(index)
                              if($(this).hasClass('active')){
                                  $.ajax({
                                      url:publics+'shop/bettingMoonCake!enterRoom.do',
                                      type:'post',
                                      dataType:'json',
                                      xhrFields: {
                                          withCredentials: true
                                      },
                                      crossDomain: true,
                                      success:function (data) {
                                          if(data.res_code==1){
                                              switch(+index){
                                                  case 0:
                                                      window.location.href ='catchmooncake_zhuan.html';
                                                      break;
                                              }
                                          }else if(data.res_code==-1){
                                              alert(data.res_info);
                                              return false
                                          }
                                      }
                                  })
                              }
                        })
            })
        }
    }
    moonothertype.init();

})()