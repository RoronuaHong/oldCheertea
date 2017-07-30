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
                            tag_id:62
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                          swiperfun.showPrizebox(".mid", data.res_data.goodsList);
                        }                                    
                     },
                  error: function(res) {
                    console.log(res);
                  }
              });

