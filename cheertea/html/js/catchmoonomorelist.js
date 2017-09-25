;(function() {
    var $ = require("./common/zepto");
    require("./common/lCalendar.min");
    require("./common/fastclick");
    var publics = "http://wx.cheertea.com/";
    if(window.location.host == "wx.cheertea.com") {
        publics = "http://wx.cheertea.com/";
    } else if(window.location.host == "test.cheertea.com") {
        publics = "http://test.cheertea.com/";
    } else {
        publics = "http://192.168.2.17:8080/zxxt_qyy/";
    }
    var morelist={
        init: function () {
            //初始化
            // var calendar = new lCalendar();
            // calendar.init({
            //     'trigger': '#selection-time',
            //     'type': 'date'
            // });
            var timeTextbtn=$('#selection-time');
            //初始化榜单
            // setTime();
            // timeList();
            allList()
            //每日榜单
            function setTime() {
                var now = new Date();
                var str =now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();//2017-08-01
                timeTextbtn.val(str);
            }
            function timeList() {
                $('.catch-list-ct').html('');
                var timeStr=timeTextbtn.val();
                timeStr = timeStr.replace(/-/g,'/');
                var date = new Date(timeStr);
                var time = date.getTime();//转为13位时间戳
                $.ajax({
                    url:publics+'shop/bettingMoonCake!getDayRank.do',
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
                        console.log(data);
                        $.each(data.res_data.list,function (i) {
                            var tels=!!data.res_data.list[i].mobile && (data.res_data.list[i].mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                            if(!tels){
                                tels='未绑定手机号';
                            }
                            $('.catch-list-ct').append(
                                "<li>"+
                                "<span>"+(i+1)+"</span>"+
                                "<span>"+tels+"</span>"+
                                "<span>"+data.res_data.list[i].after_score+"</span>"+
                                "</li>"
                            )
                        });
                    },
                    error:function () {
                        console.log('请求失败，请重试')
                    }
                })
            }
            //月度榜单
            function monList() {
                var  monCont=$('.click-mon').html();
                var  month=0;
                $('.catch-list-ct').html('');
                if(monCont=='二旬（第一）'){
                    month=1;
                }
                if(monCont=='二旬（第二）'){
                    month=2;
                }
                if(monCont=='二旬（第三）'){
                    month=3;
                }
                if(monCont=='二旬（第四）'){
                    month=4;
                }
                // console.log(month);
               $.ajax({
                   url:publics+'shop/bettingMoonCake!getMonthRank.do',
                   type:'post',
                   xhrFields: {
                       withCredentials: true
                   },
                   crossDomain: true,
                   dataType:'json',
                   data:{
                       month:month
                   },
                   success:function (data) {
                       // console.log(data)
                       $.each(data.res_data.list,function (i) {
                           var tels=!!data.res_data.list[i].mobile && (data.res_data.list[i].mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                           if(!tels){
                               tels='未绑定手机号';
                           }
                           $('.catch-list-ct').append(
                               "<li>"+
                               "<span>"+(i+1)+"</span>"+
                               "<span>"+tels+"</span>"+
                               "<span>"+data.res_data.list[i].after_score+"</span>"+
                               "</li>"
                           )
                       });
                   }
                })
            }
            //总榜
            function allList() {
                var now = new Date();
                var str =now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();//2017-08-01
                str = str.replace(/-/g,'/');
                var date = new Date(str);
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
                        $.each(data.res_data.list,function (i) {
                            var tels=!!data.res_data.list[i].mobile && (data.res_data.list[i].mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                            if(!tels){
                                tels='未绑定手机号';
                            }
                            $('.catch-list-ct').append(
                                "<li>"+
                                "<span>"+(i+1)+"</span>"+
                                "<span>"+tels+"</span>"+
                                "<span>"+data.res_data.list[i].after_score+"</span>"+
                                "</li>"
                            )
                        });
                    }
                })
            }
            function setNowTime() {
                var now = new Date();
                var str =now.getFullYear()+"年"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"月"+(now.getDate()<10?"0":"")+now.getDate()+"日"+now.toLocaleTimeString();//2017-08-01
                 $('.selection-all').html(str)
            }
            //每日时间改变榜单变化
            // timeTextbtn.on('input',function () {
            //     timeList();
            // });
            //选择月度时间
            // $('.click-mon').click(function (event) {
            //     $('.selection-list').toggle();
            //     event.stopPropagation();
            // });
            //榜单选择切换
            // $('.mon-list').find('li').on('click',function (event) {
            //     $('.mon-list').find('li').removeClass('active');
            //     $(this).addClass('active');
            //     $('.click-mon').html($(this).html());
            //     $('.selection-list').hide();
            //     monList();
            //     event.stopPropagation();
            // });
            // $(document).click(function () {
            //     $('.selection-list').hide();
            // });
            //排行
            // var selectLi=$('.select-li').find('li');
            // selectLi.each(function (index,item) {
            //             $(item).click(function () {
            //                 selectLi.removeClass('active');
            //                 $('.catch-list-ct').html('');
            //                 $('.selection-component').hide().eq(index).show();
            //                 $(this).addClass('active');
            //                    if(index==0){
            //                        setTime();
            //                        timeList();
            //                        $('.moonmorelist-title').html('今日排行榜');
            //                    }else if(index==1){
            //                        monList();
            //                        $('.moonmorelist-title').html('本月排行榜');
            //                    }else if(index==2){
            //                        $('.moonmorelist-title').html('总榜');
            //                        setNowTime();
            //                        allList();
            //                    }
            //                 event.stopPropagation();
            //                })
            // })
            //榜单须知
            $('.listmustknow').click(function () {
                $('#showDelete').show();
                console.log(111)
            });
            //确定关闭遮罩
            $('.listrule').find('div').click(function () {
                $('#showDelete').hide();
            })
        }
    }
    morelist.init();
})()