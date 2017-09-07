;(function() {
    var $ = require("./common/zepto");

    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var myprize={
        init:function () {
              $.ajax({
                  url:publics+'shop/bettingMoonCake!showGainReward.do',
                  type:'post',
                  dataType:'json',
                  xhrFields: {
                      withCredentials: true
                  },
                  crossDomain: true,
                  success:function (data) {
                      if(data.res_code==0){
                          window.location.href = "cn/login.html?forward=" + window.location.pathname;
                      }
                      if(data.res_code==1){
                          // console.log(data);
                          if(data.res_data.gain_reward_list.length<=0){
                                $('.nonePrize').show();
                                return false
                          }
                          $.each(data.res_data.gain_reward_list,function (i) {
                              // data.res_data.gain_reward_list[i]
                          var  prizeClass=(data.res_data.gain_reward_list[i].is_exchange==0) ? 'prize-normal' : 'prize-state';
                              $('.myprize-list').append(
                              "<li goodsId='"+data.res_data.gain_reward_list[i].goods_id+"' isExchangge='"+data.res_data.gain_reward_list[i].is_exchange+"' >"+
                              "<div class='myprize-ct'>"+
                                  "<span>"+data.res_data.gain_reward_list[i].content+"</span>"+
                                  "<p>"+data.res_data.gain_reward_list[i].activity_name+"</p>"+
                                  "</div>"+
                                  "<div class='"+prizeClass+"'>"+
                                  "</div>"+
                                  "<div class='prize-arrow'>"+
                                  "<img src='http://images.cheertea.com/prizearrow.png'>"+
                                  "</div>"+
                              "</li>"
                              )
                          })
                      }

                  },
                  error:function (data) {

                  }
              })  ;
              this.getPrize();
        },
        getPrize:function () {
            var goodsId=0;
            var isExchangge=0;
            var state=0;
                $('.myprize-list').on('click','li',function () {
                    isExchangge=$(this).attr('isExchangge');
                    goodsId=$(this).attr('goodsId');
                    if(isExchangge==0){
                    window.location.href="product_info.html?goods_id="+goodsId+"&"+"state="+isExchangge;
                    }else {
                        return false;
                    }
                })
        }


    }
    myprize.init()
})()