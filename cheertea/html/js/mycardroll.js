 var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/touch");
var Popup = require("./function/Popup");

// 请求数据
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
                            var str = data.res_data.couponsList;
                            console.log(str);
                            for(var i=0;i<str.length; i++){
                            // 时间13位转换
                            function getLocalTime1(nS) {      
                             return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
                                                      }  
                            var time = (getLocalTime1(str[i].end_time).substring(0,10));
                            if(str[i].cpns_id==215||str[i].cpns_id==217||str[i].cpns_id==218||str[i].cpns_id==219){
                              var html = '<div class="cards"> <img class="pic" src="http://images.cheertea.com/mother_03.jpg" alt="" /> <span class="incloud">使用范围:</span> <em class="only">仅限安娜妈妈品牌专区</em> <span class="money">¥</span> <em class="money1"></em> <span class="full">满<em class="moremoney"></em>元使用</span> <span class="time">截止日期:<em class="time1"></em></span> </div>'
                              $(".card").append(html);
                              $(".cards").eq(i).find(".money1").html(str[i].discount_price);
                              $(".cards").eq(i).find(".moremoney").html(str[i].order_amount);
                                   $(".cards").eq(i).find(".time1").html(time);
                            }else if(str[i].cpns_id==220||str[i].cpns_id==221||str[i].cpns_id==222||str[i].cpns_id==223||str[i].cpns_id==224||str[i].cpns_id==225){
                              var html2 = '<div class="cards"> <img class="picture" src="http://images.cheertea.com/self_03.jpg" alt="" /> <span class="incloud">使用范围:</span> <em class="only">仅限中秋兑奖区使用</em><span class="buy">提货券</span> <span class="amoney">¥</span> <em class="amoney1"></em> <span class="time">截止日期:<em class="time1"></em></span> </div>'
                              $(".card").append(html2);
                              console.log(str[i].cpns_id)
                              console.log(str[i].discount_price);
                              console.log(time);
                              $(".cards").eq(i).find(".amoney1").html(str[i].discount_price);
                              $(".cards").eq(i).find(".time1").html(time);   
                            }
                            else{
                              var html1 = '<div class="cards"> <img class="pic" src="http://images.cheertea.com/self_03.jpg" alt="" /> <span class="incloud">使用范围:</span> <em class="only over"></em> <span class="money">¥</span> <em class="money1"></em> <span class="full">满<em class="moremoney"></em>元使用</span> <span class="time">截止日期:<em class="time1"></em></span> </div>'
                              $(".card").append(html1);
                              $(".cards").eq(i).find(".only").html(str[i].cpns_name);
                              $(".cards").eq(i).find(".money1").html(str[i].discount_price);
                              $(".cards").eq(i).find(".moremoney").html(str[i].order_amount);
                              $(".cards").eq(i).find(".time1").html(time);
                            }

                            }
                        }                        
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });