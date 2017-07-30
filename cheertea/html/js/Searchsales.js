var $ = require("./common/zepto");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();


var html = '<div class="left"> <img class="pic" src="../healthpic.png" alt="" /> <p>安踏时尚装卖店</p> <span class="money">¥<em>366</em></span> <em class="count">月销量:</em> <span class="count1"><em>2002</em>件</span> </div>'; 
    $('.mid').append(html);
// 第一次请求
              //   $.ajax({
              //     url:'http://wx.cheertea.com/goods!getGoodsListByTagId.do',
              //     type:'post',
              //     xhrField: {
              //       withCredentials: true
              //     },
              //     crossDomain: true,
              //     data:{
              //               tag_id:65
              //             },
              //     dataType:'json',
              //     success: function(data){   
              //         console.log(data); 
              //           if(data.res_code==1){
              //               var str = data.res_data.goodsList; 
              //               for(var i=0; i < str.length; i++){
              //                   var imgs = imgchange.show(str[i].image);
              //                   console.log(imgs)
              //                   $(".img3").eq(i).attr('src', imgs);
              //               }  
              //           }
                                                        
              //       },
              //     error: function(res) {
              //       console.log(res);
              //     }
              // });