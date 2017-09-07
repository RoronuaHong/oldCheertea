
;(function() {
    var $ = require("./common/zepto");
    // require("./common/fx");
    // require("./common/fx_methods");
    // require('./common/selector');
    // require('./common/touch');
    require('./common/fastclick');
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var moonzhuan={
        init:function () {
            $.ajax({
                url:publics+'shop/bettingMoonCake!initDoubleArea.do',
                type:'post',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:'json',
                success:function (data) {
                            console.log(data);
                    $('.lotterysum').find('strong').html(data.res_data.draw_count);
                },
                error:function (data) {
                    console.log("请求失败")
                }
           });
            this.getlotter();
            $('.getWindow').get(0).addEventListener('touchmove', function (event) { 　　　　　　　　　　　　
                    event.preventDefault();　　　　　　　　
            });
        },
        getlotter:function () {
            var lotterOnOff=true;
            $('.lotterselect').on('click',function () {
                var rotate=0;
                var angle=0;
                var joinArr=[1,3,5];
                var  resulPrize=$('.show-result-prize');
                var  winTimer=null;
                var  lastNum=$('.lotterysum').find('strong').html();
                if(lastNum<=0){
                    alert('您没有抽奖机会啦~');
                    return false;
                }
                if(lotterOnOff){
                    lotterOnOff=false;
                    $.ajax({
                        url: publics + 'shop/bettingMoonCake!doDoubleDayLottery.do',
                        type: 'post',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data);
                            if(data.res_data.draw_result=='参与奖'){
                                rotate=joinArr[parseInt(Math.random()*3)];
                                // console.log(rotate)
                            }
                            if(data.res_data.draw_result=='一等奖'){
                                rotate=0;
                            }
                            if(data.res_data.draw_result=='二等奖'){
                                console.log(data.res_data.draw_result)
                                rotate=2;
                            }
                            if(data.res_data.draw_result=='三等奖'){
                                console.log(data.res_data.draw_result)
                                rotate=4;
                            }
                            // console.log(rotate)
                            // console.log(360*6+(-60*rotate));
                            angle=360*6+(-60*rotate);
                            $(".mainlotter_inner").css({
                                "-webkit-transform": "rotate(" + angle + "deg)",
                                "transform": "rotate(" + angle+ "deg)",
                                "-webkit-transition": "all 2.3s",
                                "transition": "all 2.3s"
                            });
                            clearTimeout(winTimer);
                            winTimer=setTimeout(function () {
                                $('.getWindow').show();
                                if(data.res_data.draw_result=='参与奖') {
                                    resulPrize.html('15个绿积分');
                                    resulPrize.css({color:'#07d602'});
                                }else{
                                    resulPrize.html(data.res_data.draw_result);
                                    resulPrize.css({color:'#ff8b02'});
                                }
                                $(".mainlotter_inner").css({
                                    "-webkit-transform": "rotate(" + 0 + "deg)",
                                    "-moz-transform": "rotate(" + 0 + "deg)",
                                    "-ms-transform": "rotate(" + 0+ "deg)",
                                    "transform": "rotate(" + 0+ "deg)",
                                    "-webkit-transition": "all 0s",
                                    "transition": "all 0s"
                                });
                                lotterOnOff=true;
                            },3000);

                            $('.closeWin').on('click',function () {
                                $('.getWindow').hide();
                            });
                            $('.lotterysum').find('strong').html(data.res_data.draw_count);
                        },
                        error:function(data){
                            console.log(data);
                            console.log('请求失败')
                        }
                    })
                }


            })
        }
    };
    moonzhuan.init();
})()