var $ = require("./common/zepto");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
// var Ajax = require("./function/ajax");
// 第一次请求
                $.ajax({
                  url:'http://wx.cheertea.com/goods!getGoodsListByTagId.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            tag_id:65
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                            swiperfun.Yangsbox(".mid", data.res_data.goodsList);
                            }                                      
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });
// 第二次请求
                  $.ajax({
                  url:'http://wx.cheertea.com/goods!getGoodsListByTagId.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            tag_id:66
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                            swiperfun.Yangsbox(".mid1", data.res_data.goodsList);
                        }
                                                        
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });
// 第三次请求
                  $.ajax({
                  url:'http://wx.cheertea.com/getGoodsListByCatId.action',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            id:765
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                          swiperfun.showPrizebox(".session2", data.res_data.goodsList);
                        }                                    
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });

