var $ = require("./common/zepto");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();
// ajax请求
                  $.ajax({
                  url:'http://wx.cheertea.com/goods!getGoodsListByTagId.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            tag_id:72
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                            swiperfun.Yangsbox(".session", data.res_data.goodsList);
                            }                                      
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });
// ajax第二次请求
                  $.ajax({
                  url:'http://wx.cheertea.com/zxxt_qyy/goods!getGoodsListByTagId.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            tag_id:71
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                            swiperfun.Yangsbox(".session1", data.res_data.goodsList);
                            }                                      
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });