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
             var _this=this;
            _this.getMyPrize();
            _this.toggleBtn();
            _this.getPrize();
            _this.getClick();
            _this.getCardClick();
        },
        //导航类型切换
        toggleBtn:function(){
            var _this=this;
            $('.select-prize').find('span').on('click',function () {
                $('.nonePrize').hide();
                var index=$(this).index();
                 $('.select-prize').find('span').removeClass('active');
                 $(this).addClass('active');
                 $('.alllist').hide().eq(index).show();
                switch(+index){
                    case 0:
                        _this.getMyPrize();break;
                    case 1 :
                        _this.getMycard();break;
                    case 2 :
                        _this.getCatchList(); break;
                }
            })
        },
        //我的奖品渲染
        getMyPrize: function() {
            $('.myprize').html('');
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
                  var prizeLength=data.res_data.gain_reward_list.length;
                    if(prizeLength){
                        $.each(data.res_data.gain_reward_list,function (i) {
                            // data.res_data.gain_reward_list[i]
                            var  prizeClass=(data.res_data.gain_reward_list[i].is_exchange==0) ? 'prize-normal' : 'prize-state';
                            $('.myprize').append(
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
                    }else {
                        $('.nonePrize').show();
                    }
                }

            },
            error:function (data) {

            }
        })  ;
    },
        //我的卡券渲染
        getMycard: function () {
            var _this=this;
            $('.card').html('');
        $.ajax({
            url:'http://wx.cheertea.com/getMemberCoupons.action',
            type:'post',
            xhrField: {
                withCredentials: true
            },
            crossDomain: true,
            data:{
            },
            dataType:'json',
            success: function(data){
                console.log(data);
                if(data.res_code==1){
                    var str=data.res_data.couponsList;
                    var cardLength = data.res_data.couponsList.length;
                    if(cardLength){
                        $('.card').css({'paddingTop':50});
                        for(var i=0;i<cardLength; i++){
                            // 时间13位转换
                            var time = (_this.getLocalTime(str[i].end_time).substring(0,10));
                            if(str[i].cpns_id>=215 && str[i].cpns_id<=219){
                                var html = '<div class="cards" cpnsId="'+str[i].cpns_id+'"><img class="pic" src="http://images.cheertea.com/mother_03.jpg" alt="" /> <span class="incloud">使用范围:</span> <em class="only">仅限安娜妈妈品牌专区</em> <span class="money">¥</span> <em class="money1">'+str[i].discount_price+'</em> <span class="full">满<em class="moremoney">'+str[i].order_amount+'</em>元使用</span> <span class="time">截止日期:<em class="time1">'+time+'</em></span> </div>';
                                $(".card").append(html);
                                // $(".cards").eq(i).find(".money1").html(str[i].discount_price);
                                // $(".cards").eq(i).find(".moremoney").html(str[i].order_amount);
                                // $(".cards").eq(i).find(".time1").html(time);
                            }
                            if(str[i].cpns_id>=227 && str[i].cpns_id<=232){
                                var html2 = '<div class="cards"  cpnsId="'+str[i].cpns_id+'">' + ' <img class="picture" src="http://images.cheertea.com/self_03.jpg" alt="" /> <span class="incloud">使用范围:</span> <em class="only">仅限中秋兑奖区使用</em><span class="buy">提货券</span> <span class="amoney">¥</span> <em class="amoney1">'+str[i].discount_price+'</em> <span class="time">截止日期:<em class="time1">'+time+'</em></span> </div>'
                                $(".card").append(html2);
                                // console.log(str[i].cpns_id)
                                // console.log(str[i].discount_price);
                                // console.log(time);
                            }

                            if(str[i].cpns_id>=206 && str[i].cpns_id<=213){
                                var html1 = '<div class="cards"  cpnsId="'+str[i].cpns_id+'"> <img class="pic" src="http://images.cheertea.com/self_03.jpg" alt="" /> <span class="incloud">使用范围:</span> <em class="only over">'+str[i].cpns_name+'</em> <span class="money">¥</span> <em class="money1">'+str[i].discount_price+'</em> <span class="full">满<em class="moremoney">'+str[i].order_amount+'</em>元使用</span> <span class="time">截止日期:<em class="time1">'+time+'</em></span> </div>'
                                $(".card").append(html1);
                            }
                        }
                    }else{
                        $('.card').css({'paddingTop':0});
                        $('.nonePrize').show();
                    }
                }

            },
            error: function(res) {
                console.log(res);
            }
        });
    },
        //博饼记录渲染
        getCatchList: function() {
            var _this=this;
            $('.catchct').html('');
        $.ajax({
            url: publics+'shop/bettingMoonCake!getBettingMoonCakeResult.do',
            type: 'post',
            xhrField: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                console.log(data)
                // if(data.res_code==0){
                //     window.location.href = "cn/login.html?forward=" + window.location.pathname;
                // }
                if(data.res_code==1){
                    if(data.res_data.list.length){
                        $.each(data.res_data.list,function (i) {
                            var  times=new Date(data.res_data.list[i].create_time);
                            var  nowTime=_this.formatDate(times);
                            var  btnClass=data.res_data.list[i].is_exchange==0 ?  'getprize-btn btn' : 'getprize-btn btn active';
                            $('.catchct').append(
                                "<li  resultId='"+data.res_data.list[i].result_id+"'>"+
                                "<div class='myprize-ct'>"+
                                "<span>"+data.res_data.list[i].reward_result+"</span>"+
                                "<p>"+nowTime+"</p>"+
                                "</div>"+
                                "<div class='get-btn'>"+
                                // "<div class='"+btnClass+"'  getType='0'>"+'兑换礼品'+"</div>"+
                                "<div class='"+btnClass+"'   getType='1' >"+'兑换机会'+"</div>"+
                                "</div>"+
                                "</li>"
                            )
                        })
                    }else{
                        $('.nonePrize').show();
                    }
                }
            },
            error:function () {
                console.log('失败')
            }
        })
    },
        //转换时间戳具体时间
        formatDate: function (now) {
            var year= checkTime(now.getFullYear());
            var month=checkTime(now.getMonth()+1);
            var date=checkTime(now.getDate());
            var our=checkTime(now.getHours());
            var minute=checkTime(now.getMinutes());
            return year+"-"+month+"-"+date+" "+our+":"+minute;
            function checkTime(i){
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        },
        //转换时间戳日期
        getLocalTime: function (nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
        //我的奖品点击跳转
        getPrize:function () {
            var goodsId=0;
            var isExchangge=0;
            var state=0;
            $('.myprize').on('click','li',function () {
                isExchangge=$(this).attr('isExchangge');
                goodsId=$(this).attr('goodsId');
                if(isExchangge==0){
                    window.location.href="product_info.html?goods_id="+goodsId;
                }else {
                    return false;
                }
            })
        },
        //我的奖品兑换点击
        getClick:function () {
            $('.catchct').on('click','.btn',function () {
                var getType=$(this).attr('getType');
                var resultId=$(this).parent().parent().attr('resultId');
                 // console.log(getType)
                 // console.log(resultId)
                var _this=$(this);
                if(!$(this).hasClass('active')){
                        $.ajax({
                            url:publics+'shop/bettingMoonCake!bettingMoonCakeExchange.do',
                            type:'post',
                            xhrField: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            data:{
                                result_id:resultId,
                                exchange_type:getType
                            },
                            dataType:'json',
                            success: function(data){
                                console.log(data);
                                _this.addClass('active').siblings().addClass('active');
                                $('#showDelete').show();
                                if(getType==0) {
                                    $('.showbox').find('p').html(data.res_data.reward);
                                }
                                if (getType == 1) {
                                    $('.showbox').find('p').html(data.res_data.add_draw_count + '次抽奖次数')
                                }

                            },
                            error: function (data) {
                                console.log('兑换失败')
                            }
                        })
                }
            });
            //点击确定关闭弹窗
            $('.showbox').find('div').click(function () {
                    $('#showDelete').hide();
            })
        },
        //兑换券点击
        getCardClick: function () {
            $('.card').on('click','.cards',function () {
                var cpnsId=$(this).attr('cpnsId');
                if(cpnsId>=215 && cpnsId<=219){
                    window.location.href='http://wx.cheertea.com/cn/mother-goodlsit.html';
                }
                if((cpnsId>=206 && cpnsId<=213)|| (cpnsId>=227 && cpnsId<=232)){
                    window.location.href='http://wx.cheertea.com/cn/moongetgoodlist.html';
                }
            });

        }

    }
    myprize.init()
})()