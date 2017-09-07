
;(function() {
    var $ = require("./common/zepto");
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
        init: function () {
                //判断是否登陆
                this.isLogin();
                //加载时间选择器
                var calendar = new lCalendar();
                calendar.init({
                    'trigger': '#selection-time',
                    'type': 'date'
                });
                //初始化时间及排行榜
                var now = new Date();
                var str =now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();//2017-08-01
                var timeTextbtn=$('#selection-time');
                timeTextbtn.val(str);
                timeList();
                $('body').on('touchmove','.gearDate',function (event) {
                       event.preventDefault()
                })
                //监听时间输入框值是否变化
                timeTextbtn.on('input',function () {
                    timeList();
                });
                //排行榜无缝滚动
                var scrollTimer=null;
                var listWrap=$('.catch-list-wrap').get(0);
                var listUlTop=$('.catch-list-top').get(0);
                var listUlBottom=$('.catch-list-bottom').get(0);
                function Marquee() {
                    if (listUlBottom.offsetTop - listWrap.scrollTop < 0)
                        listWrap.scrollTop -= listUlTop.offsetHeight;
                    else {
                        listWrap.scrollTop++
                    }
                }
                function timeList() {
                    var timeStr=timeTextbtn.val();
                    timeStr = timeStr.replace(/-/g,'/');
                    var date = new Date(timeStr);
                    var time = date.getTime();//转为13位时间戳
                    $.ajax({
                        url:publics+'shop/bettingMoonCake!showRank.do',
                        type:'post',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType:'json',
                        data:{
                            rank_time:time
                        },
                        success:function (data) {
                           // console.log(data);
                            $('.catch-list-ct').html('');
                              $.each(data.res_data.list,function (i) {
                                    var tels=!!data.res_data.list[i].mobile && (data.res_data.list[i].mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                    if(!tels){
                                        tels='未绑定手机号';
                                    }
                                    $('.catch-list-top').append(
                                        "<li>"+
                                        "<span>"+(i+1)+"</span>"+
                                        "<span>"+tels+"</span>"+
                                        "<span>"+data.res_data.list[i].after_score+"</span>"+
                                        "</li>"
                                    )
                                });
                              //判断数据长度是否超过可视区，超过即滚动
                              if (data.res_data.list.length>=5){
                                  listUlBottom.innerHTML+=listUlTop.innerHTML;
                                  clearInterval(scrollTimer);
                                  listWrap.scrollTop=0;
                                  scrollTimer=setInterval(Marquee,30)
                              }
                        },
                        error:function () {
                            console.log('请求失败，请重试')
                        }
                    })
                }
                //房间选择
                 this.enterRoom();
                //王中王剩余时间
                this.timeFly();
            },
        isLogin:function () {
            //登陆按钮点击事件
            var _this=this;
            // var loginBtn=$('.pre-login');
            // var wasLogin=$('.was-login');
             $.ajax({
                url:publics+"shop/bettingMoonCake!initGame.do",
                type:'post',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType:'json',
                success:function (data) {
                    // console.log(data);
                    // console.log('成功获取个人数据');
                    // console.log(data.res_code);
                            if(data.res_code==0){
                                    var parentId = _this.isEarn("memberid");
                                    if(!!parentId) {
                                        var url="/cn/login.html?state="+parentId+"&forward=" + window.location.pathname;
                                        window.location.href = url;
                                    } else {
                                        window.location.href = "/cn/login.html?forward=" + window.location.pathname;
                                    }
                            }
                            if(data.res_code==1){
                                console.log(data)
                                console.log(1)
                                $('.catch-cake-num').html(data.res_data.all_count+'次');
                                $('.catch-people-score').html(data.res_data.all_score+'分');
                                $('.catch-people-num').html(data.res_data.own_rank);
                                $('.catch-prize-num').html(data.res_data.all_draw_count+'次');
                }
                },
                error:function(){
                    console.log('获取数据失败');
                }
            })
        },
        timeFly:function () {
                var kingTime=null;
                function leftTimer(year,month,day,hour,minute,second){
                    var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
                    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
                    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
                    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
                    days = checkTime(days);
                    hours = checkTime(hours);
                    minutes = checkTime(minutes);
                    seconds = checkTime(seconds);
                    var now = new Date().getTime(); //当前时间
                    var myTime = Date.parse("2017-10-20 08:00:00".replace(/-/g, "/"));
                    if(now-myTime >=0) {
                        clearInterval( kingTime);
                        days='00';
                        hours='00';
                        minutes='00';
                        seconds='00';
                    }
                    $('.day').html(days);
                    $('.hours').html(hours);
                    $('.minutes').html(minutes);
                    $('.seconds').html(seconds);
                }
                function checkTime(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
                kingTime=setInterval(function () {
                    leftTimer(2017,10,20,7,0,0);
                }, 1000);
        },
        isEarn: function(name) {

            //正则判断URL是否存在当前
            var veg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substring(1).match(veg);
            if(r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        enterRoom:function () {
            $('.catchcakeapart').find('li').on('click',function (index) {
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
            $('.go-catch').click(function () {
                $.ajax({
                    url:publics+'shop/bettingMoonCake!enterRoom.do',
                    type:'post',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType:'json',
                    data:{
                        room_id:1
                    },
                    success:function (data) {
                        // console.log(data)
                        if(data.res_code==1){
                            window.location.href ='catchmoonroom.html?roomID=1';
                        }else if(data.res_code==-1){
                            alert(data.res_info);
                            return false
                        }
                    }
                })
            })
        }
    };
    catchmooncake.init();
})();
