var $ = require("./common/zepto");
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/touch");
// 兑奖方式链接
$(".top span").on('touchstart',function(){
    window.location.href = "duijiangway.html";
    });
// 我的中奖ajax
            // $.ajax({
            //       url:'http://192.168.2.17:8080/zxxt_qyy/shop/activityZhaoCha!submitSuggest.do',
            //       type:'post',
            //       xhrField: {
            //         withCredentials: true
            //       },
            //       crossDomain: true,
            //       data:{
            //                // content:input2, 
            //               },
            //       dataType:'json',
            //       success: function(data){   
            //           console.log(data); 
            //             if(data.res_code==1){
            //                 var str = res.res_data.goodsList;
            //                 for(var i=0;i<str.length;i++){
            //                     var html ='<div class="news clearfix"><span class="game">大家来找茬</span> <span class="time">2017-09-10</span> <img class="picture" src="../int_03.png" alt="" /> <span class="winning">月月奖</span> <a class="more" href=""><img src="../mywin_05.png" alt="" /></a></div>' 
            //                      // 时间13位转换
            //                     function getLocalTime1(nS) {      
            //                      return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
            //                                               }  
            //                     var time = (getLocalTime1(str[i].create_time).substring(0,9));
            //                     $(".mywinningprizewrap").append(html);
            //                     $(".game").eq(i).html(str[i].);
            //                     $(".time").eq(i).html(time);
            //                     $(".winning").eq(i).html(str[i].);
            //                     $(".more").eq(i).attr('href','http://wx.cheertea.com/cn/product_info.html?goods_id='+str[i].goods_id+"activity_id="+str[i].activity_id);
            //                 }
            //             }                               
            //          },
            //       error: function(res) {
            //         console.log(res);
            //       }
            //   });