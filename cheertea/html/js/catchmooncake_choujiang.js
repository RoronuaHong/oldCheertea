
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
    var moonchoujiang={
        init:function () {
               //初始化抽奖机会
            $.ajax({
                url:publics+"shop/bettingMoonCake!initDrawArea.do",
                type:'post',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:'json',
                success:function (data) {
                    console.log(data);
                    if(data.res_code==0){
                        window.location.href = "/cn/login.html?forward=" + window.location.pathname;
                    }
                    if(data.res_code==1){
                        $('.get-prize-score').find('span').html(data.res_data.score);
                        $('.get-prize-num').find('span').html(data.res_data.draw_count);
                    }
                },
                error:function (data) {
                    console.log("请求超时")
                }
            });
            $('.getWindow').on('touchmove',function (event) {
                event.preventDefault()
            });
            this.getPrize();
            this.getNum();
        },
        getPrize:function () {
            var  prizeOnOff=true;
            var  winTimer=null;
            var  angle=0;
            $('.lotterselectimg').on('click',function () {
                if(  $('.get-prize-num').find('span').html()<=0){
                    alert("您的抽奖次数不够了");
                    return false;
                }
                if(prizeOnOff){
                        prizeOnOff=false;
                    $.ajax({
                        url: publics + "shop/bettingMoonCake!doDrawLottery.do",
                        type: 'post',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data);
                            $('.get-prize-num').find('span').html(data.res_data.draw_count);
                            var  rotate=data.res_data.reward_grade-13;
                            // console.log(rotate);
                            angle=360*5-90+45*rotate;
                            // console.log(angle);
                            $(".mainlotter_inner").css({
                                "-webkit-transform": "rotate(" +angle + "deg)",
                                "transform": "rotate(" + angle + "deg)",
                                "-webkit-transition": "all 2.3s",
                                "transition": "all 2.3s"
                            });
                            clearTimeout(winTimer);
                            winTimer=setTimeout(function () {
                                $('.getWindow').show();
                                $('.show-result-prize').html(data.res_data.draw_result);
                                if(data.res_data.reward_grade==18){
                                    $('.congra').hide();
                                    $('.show-result-prize').css({color:'#333'});
                                }else{
                                    $('.congra').show();
                                    $('.show-result-prize').css({color:'#07d602'});
                                }
                                prizeOnOff=true;
                            },3000);
                            $('.closeWin').on('click',function () {
                                $(".mainlotter_inner").css({
                                    "-webkit-transform": "rotate(" + 0 + "deg)",
                                    "-moz-transform": "rotate(" + 0 + "deg)",
                                    "-ms-transform": "rotate(" + 0+ "deg)",
                                    "transform": "rotate(" + 0+ "deg)",
                                    "-webkit-transition": "all 0s",
                                    "transition": "all 0s"
                                });
                                $('.getWindow').hide();
                            });
                        },
                        error:function (data) {
                            console.log(data)
                        }
                    })
                }

            })
        },
        //兑换次数
        getNum:function(){
            $('.get-use-btn').on('click',function () {
                var useNum=$('.get-use-num').val();
                if(useNum>0){
                    $.ajax({
                        url: publics + "shop/bettingMoonCake!exchangeScore.do",
                        type: 'post',
                        xhrFields: {
                            withCredentials: true
                        },
                        data:{
                            exchange_count:useNum
                        },
                        crossDomain: true,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if(data.res_code==-1){
                                alert('您的博饼分不够，请重新输入');
                            }else{
                                $('.get-prize-score').find('span').html(data.res_data.after_score);
                                $('.get-prize-num').find('span').html(data.res_data.after_draw);
                                alert('兑换成功');
                            }
                            $('.get-use-num').val('');
                        },
                        error:function () {
                            console.log('请求失败');
                        }
                    })
                }else {
                    alert("请输入正确的次数")
                }

            })

         }

    };
    moonchoujiang.init();
})()