var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
var newimgchange = new newimgChange();
var swiperFun = require("./function/swiperFun");
var swiperfun = new swiperFun();

require("./common/echo.js");
require("./common/touch");

var imgurl = "http://images.cheertea.com/";
if(window.location.host == "wx.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else if(window.location.host == "wx.cheertea.com") {
    imgurl = "http://images.cheertea.com/"
} else {
    imgurl = "../images/";
}   
// 修改图片路径
function change(imgurls) {
            if(imgurls) {
                imgurls = imgurls.replace("fs:/","http://wx.cheertea.com/statics/");
            }
            return imgurls;
        }
// console.log(imgurl)
// js获取url参数值
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// 获取兑奖资格参数
var state = GetQueryString("state");
console.log(state);
var goodsid = GetQueryString("goods_id");
// 截取用户id后两位
var goodsid2 = goodsid.slice(-2);
var activityid = GetQueryString("activity_id") || "";
// 获取绿积分参数
var lvjifen = GetQueryString("ljf");
// 获取兑奖参数
var showprize = GetQueryString("showprize");
var product_info = function() {
    var _this = this;

    if(this instanceof product_info) {

    } else {
        return new product_info();
    }
}
product_info.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
          // 消费者保障条约
          $(".term strong").on('touchstart',function(){
          $(".popBox").show();
          });
          $(".cancel strong").on('touchstart',function(){
          $(".popBox").hide();
          });
          $(".confirm strong").on('touchstart',function(){
          $(".popBox").hide();
          });
          // tab切换
          $(".product-head .center span").on("tap",function(){
            $(this).addClass("active").siblings().removeClass("active");
            $(".p-product").eq($(this).index()).show().siblings(".p-product").hide();
          })

            var datas = {};
            // 商品信息ajax
            $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!getEvaluateByGoodsId.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            goods_id:goodsid,
                            composite_score:-1
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                           //修改img路径
                       $.each($(".information1").find("img"), function(i) {
                        $(".information1").find("img").eq(i).attr("src", ($(".information1").find("img").eq(i).attr("src")).replace("../", imgurl));

                        if($(".information1").find("img").eq(i).attr("data-src")) {
                          $(".information1").find("img").eq(i).attr("data-src", ($(".information1").find("img").eq(i).attr("data-src")).replace("../", imgurl));
                        }
                      });
                          $(".numb").html(data.res_data.goods_list.length);
                          $(".good").html(data.res_data.goodRate);
                          var str = data.res_data.goods_list;
                          for(var i=0;i<str.length &&i<4; i++){
                            var html = '<dt> <div class="star"> </div> <div class="name">sada12h孩子</div> </dt> <dd class="t1">很好喝哦，快来一起买吧！发货速度也快！</dd><div class="picture"></div> <dd class="t2"></dd> <dd class="t3">2017-05-05</dd>'

                              // 时间转换
                            function getLocalTime(nS) {     
                             return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
                                                      }     
                            var times = (getLocalTime(str[i].create_time).substring(0,9));
                            // 赋值
                            var pic = str[i].image_url.split(";");
                            console.log(1111)
                            console.log(pic);
                            $(".information1").append(html);
                            $(".information1 .name").eq(i).html(str[i].uname);
                            $(".information1 .t1").eq(i).html(str[i].content);
                            $(".information1 .t3").eq(i).html(times);
                            var html1='';
                            for(var j=0;j<str[i].composite_score;j++){ 
                             html1 += '<img src="../star-ico.png" alt="">'
                          }
                           $(".star").eq(i).append(html1);
                            var html2='';
                            console.log(pic.length);

                            //循环展示图片
                      for(var k=0;k<pic.length&&pic[0]!='';k++){
                         html2 = '<img class="standard" src="">';
                          $(".information1 .picture").eq(i).append(html2);
                          $(".information1 .picture").eq(i).find("img").eq(k).attr('src',change(pic[k]));
                      }

}                         
                            }                                      
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });
// 切换评价
var id=-1;
$(".appraise-grade span").eq(0).on('touchstart',function(){
   id =-1;
   showEvaluate(goodsid,id);
});
$(".appraise-grade span").eq(1).on('touchstart',function(){
   id = 0;
    showEvaluate(goodsid,id);
});
$(".appraise-grade span").eq(2).on('touchstart',function(){
   id = 1;
    showEvaluate(goodsid,id);
});
$(".appraise-grade span").eq(3).on('touchstart',function(){
   id = 2;
    showEvaluate(goodsid,id);
});
$(".appraise-grade span").eq(4).on('touchstart',function(){
   id = 3;
    showEvaluate(goodsid,id);
});
//显示评价信息
showEvaluate(goodsid,-1);
function showEvaluate(goods_id,id){
$(".assess1").children().remove();
              // 评价信息ajax
              $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!getEvaluateByGoodsId.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            goods_id:goodsid,
                            composite_score:id,
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data);
                        if(data.res_code==1){
                          var str = data.res_data.goods_list;
                          $(".appraise-grade span i").eq(0).html(data.res_data.allEvaluate);
                          $(".appraise-grade span i").eq(1).html(data.res_data.goodEvaluate);
                          $(".appraise-grade span i").eq(2).html(data.res_data.midEvaluate);
                          $(".appraise-grade span i").eq(3).html(data.res_data.chaEvaluate);
                          $(".appraise-grade span i").eq(4).html(data.res_data.picEvaluate);
                          for(var i=0;i<str.length; i++){
                            var html = '<div class="assess-num"> <div class="fl newf1"><em><img class="weixin" src="" alt=""></em><span>鸿***头</span></div> <div class="fr fz22 c6">2017-02-24</div> </div> <dl class="midd"> <dt> <div class="star newstar"></div> <!-- <div class="name">sada12h孩子</div> --> </dt> <dd class="t1 newt1">很好喝哦，快来一起买吧！发货速度也快！</dd> <dd class="t2 newt2"><div class="pic"></div></dd> <dd class="t4 newt4"> <p>购买日期：<em>2017-05-05 17:40:13</em></p> <p>类型：<span>白咖啡</span></p> </dd></dl> <div class="collect-num"> <div class="fl like"><img class="llike" src="../dianzan.png" alt="">(<span>0</span>)</div> <div class="fr newfr"><img class="llike" src="../talk-ico.png" alt="">(<span>0</span>)</div> </div> <div class="line10 newline10"></div>'     
                            // 时间转换
                            function getLocalTime(nS) {      
                             return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");     
                                                      }  
                              // 时间13位转换
                            function getLocalTime1(nS) {      
                             return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
                                                      }  
                            var time = (getLocalTime(str[i].create_time).substring(0,9));
                            var time1 = (getLocalTime1(str[i].order_time));
                            console.log(time1);
                            var pic1 = str[i].image_url.split(";");
                            // 赋值
                            $(".assess1").append(html);
                            $(".newf1 span").eq(i).html(str[i].uname);
                            $(".newt1").eq(i).html(str[i].content);
                            $(".c6").eq(i).html(time)
                            $(".newt4 em").eq(i).html(time1);
                            $(".like span").eq(i).html(str[i].like_num);
                            $(".newt4 span").eq(i).html(str[i].goods_type);
                            $(".newt4 span").eq(i).html(str[i].goods_type);
                            $(".collect-num").eq(i).attr("id", str[i].id);
                            $(".weixin").eq(i).attr('src',imgchange.show(str[i].weixin_face));
                           // $(".newt5 p").eq(i).html(str[i].repeat_content);
                            // 管理员评论
                            if(str[i].repeat_content!=undefined){
                              var html5 = '<dd class="newt5"><span>商家回复:</span><p>'+str[i].repeat_content+'</p></dd>'
                              $(".midd").eq(i).append(html5);
                              console.log(str[i].repeat_content); 
                            }

                            var html1='';
                            for(var j=0;j<str[i].composite_score;j++){ 
                             html1 += '<img src="../star-ico.png" alt="">'
                          }
                           $(".newstar").eq(i).html(html1);
                            var html2='';
                            console.log(pic1.length);
                             for(var k=0;k<pic1.length&&pic1[0]!='';k++){
                          html2 = '<img class="standard standard1" src="">';
                          $(".pic").eq(i).append(html2);
                          console.log(change(pic1[k]));
                          $(".pic").eq(i).find("img").eq(k).attr('src',change(pic1[k]));           
                      }

                      // 评论显示
                      // if(str[i].repeat_content!=undefined){
                      //   $(".newfr span").html("1");
                      //   $(".newfr span").attr("value",str[i].repeat_content);
                      // }
                      // $(".newfr").on('touchstart',function(){
                      //     window.location.href = "http://wx.cheertea.com/cn/comments_reply.html?repeat_content="+ $(this).attr("value");
                      //     });
}
                         
                            } 
                            // 切换评论级别
                                $(".appraise-grade span").on('touchstart',function(){
                                  $(this).addClass('active').siblings().removeClass('active');
                                })
                            // 点赞效果
                                    var isLike = 0;
                                $(".like img").on('touchstart',function(){
                                  var _this = $(this);
                                    if($(this).attr("src")=="http://images.cheertea.com/dianzan.png"){
                                    $(this).attr('src',"http://images.cheertea.com/love.png");
                                    isLike=1;
                                    }else{
                                      isLike=0;
                                    $(this).attr('src',"http://images.cheertea.com/dianzan.png");
                                    }
                                    
                                    // 点击增加点赞数
                                    $.ajax({
                                    url:'http://wx.cheertea.com/shop/goodsEvaluate!updateLikeNum.do',
                                    type:'post',
                                    xhrField: {
                                      withCredentials: true
                                    },
                                    data:{
                                        id:$(this).parents(".collect-num").attr("id"),
                                        isLike:isLike,
                                         },
                                    crossDomain: true,
                                    dataType:'json',
                                    success: function(res){  
                                    console.log(res.res_data.like_num)                           
                                    if(res.res_code==1)                      
                                  {
                                    console.log(_this)
                                    _this.siblings("span").html(res.res_data.like_num);

                                  }
                                },         
                              error: function(res) {
                                console.log(res);
                              },
                          });
                       });

                       //修改img路径
                      $.each($(".assess").find("img"), function(i) {
                        $(".assess").find("img").eq(i).attr("src", ($(".assess").find("img").eq(i).attr("src")).replace("../", imgurl));

                        if($(".assess").find("img").eq(i).attr("data-src")) {
                          $(".assess").find("img").eq(i).attr("data-src", ($(".assess").find("img").eq(i).attr("data-src")).replace("../", imgurl));
                        }
                      });
                                                    
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });
}


        })

        return this;
    }
}
var product_infos = new product_info();
product_infos.init();
// 商品信息ajax
  $.ajax({
  url:'http://wx.cheertea.com/shop/goodsEvaluate!getGoodsDetail.do',
  type:'post',
  xhrField: {
    withCredentials: true
  },
  data:{
      goods_id: goodsid,
      activity_id: activityid
  },
  crossDomain: true,
  dataType:'json',
  success: function(res){
            if(res.res_code==1)                       
            {
        // 判断是否收藏
        if(res.res_data.goodsMap.is_favorite==1){
          $(".detailcollection").addClass('detailcollection1');
                            }
        // 商品详情多图展示
        $(".ppro-img-info").append(res.res_data.goodsMap.intro);
        // 轮播图
        swiperfun.showBanner1(".carousel",res.res_data.galleryList);
        newimgchange.loadBanner('#newimgchange', 3000, true, 1);
              var str = res.res_data.goodsMap;
              if(!!str.activity_point){
                $(".product-name span").html(str.activity_point);
              }
              else{
                $(".product-name span").html(str.point);
              }
                
                $(".product-name strong").html(str.name);

                if(!!str.activity_price){
                   $(".fl .now-price i").html(str.activity_price);
                }
                else{
                  $(".fl .now-price i").html(str.price);
                }

                var buypeople = 100 + parseInt(str.buy_count) + parseInt(goodsid2);
                $(".pass-price strong").html(str.mktprice);
                $(".people").html(buypeople);
            }
            
    },         
  error: function(res) {
    console.log(res);
  },
});
// 猜你喜欢ajax
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!getGoodsGuccess.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                    // user_id:2017,
                    goods_id:goodsid,
                       },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){
                            if(res.res_code==0){
                             // window.location.href = "login.html?forward=" + window.location.pathname;
                            } 
                            else if(res.res_code==1)                    
                            {
                               var str = res.res_data.goodsList;
                               console.log(22222);
                               console.log(str)
                               for(var i=0;i<str.length;i++){
                                var html4 ='<dl><dt><a class="jump1" href=""><img class="likepicture" src="../img01.jpg" alt=""></a></dt> <dd class="t1"><a href="" class="likename" >心之源茶心之源茶伴侣心之源茶伴</a></dd> <dd class="t2"> <div class="now-price newnow">￥<i>199.00</i></div> <div class="pass-price newpass">零售价￥<span>299.00</span></div> </dd> </dl>'
                                  $(".enjoy-about").append(html4);
                                  $(".likepicture").eq(i).attr('src',imgchange.show(str[i].original));

                                  $(".likename").eq(i).html(str[i].name);
                                  console.log("价格"+str[i].price);
                                  if(!!str[i].activity_price){
                                     $(".newnow i").eq(i).html(str[i].activity_price);
                                  }
                                  else{
                                     $(".newnow i").eq(i).html(str[i].price);
                                  }
                                  //$(".newnow i").eq(i).html(str[i].activity_price);
                                   // $(".newnow i").eq(0).html(5555);
                                    // $(".newnow i").eq(1).html(666666);
                                  console.log("changdu "+ $(".newnow i").length);
                                  $(".newpass span").eq(i).html(str[i].mktprice);
                                  if(str[i].activity_id){
                                    $(".jump1").eq(i).attr('href','http://wx.cheertea.com/cn/product_info.html?goods_id='+str[i].goods_id+"&"+"activity_id="+str[i].activity_id);
                                  }else{
                                     $(".jump1").eq(i).attr('href','http://wx.cheertea.com/cn/product_info.html?goods_id='+str[i].goods_id);
                                  }
                                  
                               }  
                                        
                            }
                            
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });
// 包邮ajax
                
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!getGoodsDetail.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                    goods_id:goodsid,
                       },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){
                            if(res.res_code==1)                    
                            {
                              var str = res.res_data.goodsMap;
                              if(str.free_express.length!=0){
                                $(".Mailing").show();
                                for(var i=0;i<str.free_express.length;i++){
                                    var html = '<span class="areas">123</span>'
                                    $(".area").append(html);
                                    $(".areas").eq(i).html(str.free_express[i]);
                                  }
                                    $(".Mailing").on('touchstart',function(){
                                    $(".area").toggleClass('area1');
                                });
                              }

                            }
                            
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });
         
// 收藏ajax
          $(".detailcollection").on("touchend", function() {
            var _this = $(this);
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/memberFavorite!favoriteGoods.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                    goods_id:goodsid,
                       },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){
                            if(res.res_code==0)                    
                            {
                              window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
                            }
                            if(res.res_code==1){
                                _this.toggleClass('detailcollection1');
                            }
                            
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });
           }); 
// 博饼兑奖判断
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/bettingMoonCake!isCanExchange.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                    exchange_goods_id:goodsid,
                       },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){
                            if(res.res_code==1)                    
                            {
                              console.log(res.res_data.belong_reward)
                              if(res.res_data.belong_reward==1){
                                $(".buyingquick").html("立即兑奖");
                                $(".addcar").css("background","#949292");
                                $(".addcar").unbind();
                                $(".plus").unbind();
                                $(".minus").unbind();
                              }   
                              if(res.res_data.belong_reward==0){
                                  $(".buyingquick").html("已兑奖");
                                  $(".buyingquick").css("background","#7e7d7a");
                                  $(".addcar").css("background","#949292");
                                  $(".buyingquick").unbind();      
                                  $(".addcar").unbind();
                              }
                            }
                            
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });

// 加入购物车立即购买产品规格
function show() {
    //实现商品规格功能
    $(".buyingquick").on("touchend", function(event) {
      event.preventDefault();
    });
  }

  //显示购物车小图标
  /* 实现底部购物车数字显示功能 */
    function ShowCarNumber() {
       Ajax({
            urls: "member/cart!getNum.do",
            types: "get",
            dataTypes: "json",
            successes: function (data) {
                var datas = data;
                console.log(datas);

                // 实现数字的隐藏和显示
                if(datas.res_data) {
                    if(parseInt(datas.res_data.num) >= 1) {
                        $(".carnumber").html(datas.res_data.num);
                        $(".carnumber").show();
                    } else {
                        $(".carnumber").hide();
                    }
                }
            }
        });
    }
    ShowCarNumber();

  function Buy(mainEle) {
    //立即购买
    $(mainEle).on("touchend", function(event) {
      event.preventDefault();
      Ajax({
        urls: "member/login!isLogin.do",
        dataTypes: "json",
        types: "get",
        successes: function(json) {
          console.log(json);
          
          //只有一个F的时候不显示
          Ajax({
            urls: "spec/displayNoneSpec.action",
            dataTypes: "json",
            types: "get",
            datas: {
              id: goodsid,
            },
            successes: function(jsons) {
              console.log(jsons);
              
              if(jsons.res_code == 1) {
                $(".mesbox").hide();
                $("#specboxs").css({
                  height: "6rem"
                });
              }
              
              $(".selected").html("");
              if(mainEle == ".buyingquick") {
                $("#specboxs").attr("main", "1");
              } else {
                $("#specboxs").attr("main", "0");
              }
              if(json.res_code == 0) {
                alert("你尚未登录！");
                window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
              } else {
              
                //获取数据
                Ajax({
                  urls: "getSpecValueListByGoodsId.action",
                  dataTypes: "json",
                  types: "post",
                  datas: {
                    //ids: goodsid
                    id: goodsid,
                  },
                  successes: function(data) {
                    console.log(data);
                    Ajax({
                      urls: "spec/getValueStoreDetail.action",
                      dataTypes: "json",
                      types: "get",
                      datas: {
                        id: goodsid,
                      },
                      successes: function(datas) {
                        console.log(datas);
                        $("#pri").html(datas.res_data.valueStoreList[0].price);
                        $("#specboxs").show();
                        
                        var imgurls = datas.res_data.valueStoreList[0].image;
                         console.log(imgurls)
                        if(imgurls) {
                                  imgurls = imgurls.replace("fs:/", "http://files.cheertea.com/statics/");
                              }
                             
                        $("#specimg").attr("src", imgurls);
                    
                        //添加到规格表中
                        if(data.res_code == 1) {
                          $(".mesbox").empty();
                          $(".mesbox").append(
                            "<div class='specpath' ids='" + data.res_data.specValueList[0].spec_id + "'>" +
                              "<h3>" + data.res_data.specValueList[0].spec_name + "</h3>" +
                              "<ul class='specul clearfix'>" +
                                
                              "</ul>" +
                            "</div>"
                          );
                            
                          if(!!data.res_data.specValueList[1]) {
                            $(".mesbox").append(
                              "<div class='specpath' ids='" + data.res_data.specValueList[1].spec_id + "'>" +
                                "<h3>" + data.res_data.specValueList[1].spec_name + "</h3>" +
                                "<ul class='speculs clearfix'>" +
                                  
                                "</ul>" +
                              "</div>"
                            );
                            
                            $.each(data.res_data.specValueList[1].valueList, function(j) {
                              $(".speculs").append(
                                "<li speid='" + data.res_data.specValueList[1].valueList[j].spec_id + "' specid='" + data.res_data.specValueList[1].valueList[j].spec_value_id + "'>" + data.res_data.specValueList[1].valueList[j].spec_value + "</li>"
                              );
                            });
                          }
                          
                          $.each(data.res_data.specValueList[0].valueList, function(j) {
                            $(".specul").append(
                              "<li speid='" + data.res_data.specValueList[0].valueList[j].spec_id + "' specid='" + data.res_data.specValueList[0].valueList[j].spec_value_id + "'>" + data.res_data.specValueList[0].valueList[j].spec_value + "</li>"
                            );
                          });
                          
                          //当规格值只剩下一个的时候，直接显示
                          if($(".specul li").length < 2) {
                            $(".specul li").eq(0).addClass("lisel");
                            $(".selected").html("已选择<span>" + $(".specul .lisel").html() + "</span>");
                            Ajax({
                              urls: "spec/getValueStoreDetail.action",
                              dataTypes: "json",
                              types: "get",
                              datas: {
                                id: goodsid,
                              },
                              successes: function(data) {
                                $("#pri").html(data.res_data.valueStoreList[0].price);
                                if($(".speculs li").length < 2 && !!$(".speculs li").length) {
                                  $(".speculs li").eq(0).addClass("lisel");
                                  
                                  //获取规格数值
                                  Ajax({
                                    urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                                    dataTypes: "json",
                                    types: "get",
                                    successes: function(datas) {
                                      console.log(datas);
                                      if(datas.res_code == 1) {
                                        $("#pri").html(datas.res_data.product.price);
                                        $("#stores").html(datas.res_data.product.store);
                                        /* $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span>"); */
                                        if($(".speculs li").length < 2 && !!$(".speculs li").length) {                          
                                          $(".selected").html($(".selected").html() + "<span>" + $(".speculs .lisel").html() + "</span>");
                                        }
                                      }
                                    }
                                  });
                                }
                                
                                if(!$(".speculs li").length) {
                                  //获取规格数值
                                  Ajax({
                                    urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid"),
                                    dataTypes: "json",
                                    types: "get",
                                    successes: function(datas) {
                                      console.log(1111)
                                      console.log(datas);
                                      if(datas.res_code == 1) {
                                        $("#pri").html(datas.res_data.product.price);
                                        $("#stores").html(datas.res_data.product.store);
                                        /* $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span>"); */
                                      }
                                    }
                                  });
                                }
                              }
                            });
                          }
                          
                          if(!!$(".speculs li").length && $(".speculs li").length < 2) {
                            $(".speculs li").eq(0).addClass("lisel");
                            
                            Ajax({
                              urls: "spec/getValueStoreDetail.action",
                              dataTypes: "json",
                              types: "get",
                              datas: {
                                id: goodsid,
                              },
                              successes: function(data) {
                                console.log(data);
                                if($(".specul li").length < 2) {
                                  $(".specul li").eq(0).addClass("lisel");
                                  
                                  //获取规格数值
                                  Ajax({
                                    urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid"),
                                    dataTypes: "json",
                                    types: "get",
                                    successes: function(datas) {
                                      console.log(1111)
                                      console.log(datas);
                                      if(datas.res_code == 1) {
                                        $("#pri").html(datas.res_data.product.price);
                                        $("#stores").html(datas.res_data.product.store);
                                        /* $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>"); */
                                      }
                                    }
                                  });
                                }
                              }
                            });
                          }
                          
                          //进行库存比对
                          $.each($(".mesbox li"), function(i) {
                            $(".mesbox li").eq(i).addClass("unli");
                          });
                          $.each(datas.res_data.valueStoreList, function(i) {
                            $.each($(".mesbox li"), function(j) {
                              if(datas.res_data.valueStoreList[i].spec_value_id == $(".mesbox li").eq(j).attr("specid")) {
                                if(!!datas.res_data.valueStoreList[i].store) {            
                                  $(".mesbox li").eq(j).removeClass("unli");
                                }
                              }
                            });
                          });
                        }
                      }
                    });
                  },
                  error: function(data) {
                    console.log(data);
                  }
                });
              }
            }
          });
        }
      });
    });
  }
  Buy(".buyingquick");
  
  Buy(".addcar");
  
  //选择规格功能按钮
  function SelectSpec() {
    $("#specboxs").on("touchend", ".specul li", function() {
      
      if(!$(this).hasClass("unli") && !!$(this).siblings("li")) {
        if($(this).hasClass("lisel")) {
          $(this).removeClass("lisel");
          $(".speculs li").removeClass("unli");
          $(".selected").html("");
          $("#stores").html(0);
        } else {
          $(this).addClass("lisel").siblings("li").removeClass("lisel");
          Ajax({
            urls: "spec/getValueStoreDetail.action",
            dataTypes: "json",
            types: "get",
            datas: {
              id: goodsid,
              spec_id: $(this).attr("speid"),
              spec_value_id: $(this).attr("specid")
            },
            successes: function(datas) {
              console.log(datas);
              console.log(33333)
              //进行库存比对
              $.each($(".speculs li"), function(i) {
                $(".speculs li").eq(i).addClass("unli");
              });
              $.each(datas.res_data.valueStoreList, function(i) {
                if(!!datas.res_data.valueStoreList[i].store) {
                  $.each($(".speculs li"), function(j) {
                    if(datas.res_data.valueStoreList[i].spec_value_id == $(".speculs li").eq(j).attr("specid")) {         
                      $(".speculs li").eq(j).removeClass("unli");
                    }
                  });
                }
              });
  
              /* specvarr.push(); */
              if(!!$(".speculs li").length) {

                if(!!$(".specul li").hasClass("lisel") && !!$(".speculs li").hasClass("lisel")) {
                  
                  //获取规格数值
                  Ajax({
                    urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                    dataTypes: "json",
                    types: "get",
                    successes: function(datas) {
                      console.log(datas);
                      if(datas.res_code == 1) {
                        $("#pri").html(datas.res_data.product.price);
                        $("#stores").html(datas.res_data.product.store);
                        $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>");
                      }
                    }
                  });
                } 
              } else {
                console.log(123123)
                //获取规格数值
                Ajax({
                  urls: "spec/getProduct.action",
                  dataTypes: "json",
                  types: "get",
                  datas: {
                    goods_id: goodsid,
                    spec_value_ids: $(".specul .lisel").attr("specid")
                  },
                  successes: function(datas) {
                    console.log(datas);
                    if(datas.res_code == 1) {
                      $("#pri").html(datas.res_data.product.price);
                      $("#stores").html(datas.res_data.product.store);
                      $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span>");
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
    
    $("#specboxs").on("touchend", ".speculs li", function() {
      if(!$(this).hasClass("unli") && !!$(this).siblings("li")) {
        if($(this).hasClass("lisel")) {
          $(this).removeClass("lisel");
          $(".specul li").removeClass("unli");
          $(".selected").html("");
          $("#stores").html(0);
        } else {
          $(this).addClass("lisel");
          $(this).addClass("lisel").siblings("li").removeClass("lisel");  
          Ajax({
            urls: "spec/getValueStoreDetail.action",
            dataTypes: "json",
            types: "get",
            datas: {
              id: goodsid,
              spec_id: $(this).attr("speid"),
              spec_value_id: $(this).attr("specid")
            },
            successes: function(data) {
              console.log(data);
              
              //进行库存比对
              $.each($(".specul li"), function(i) {
                $(".specul li").eq(i).addClass("unli");
              });
              $.each(data.res_data.valueStoreList, function(i) {
                if(!!data.res_data.valueStoreList[i].store) {
                  $.each($(".specul li"), function(j) {
                    if(data.res_data.valueStoreList[i].spec_value_id == $(".specul li").eq(j).attr("specid")) { 
                            
                      $(".specul li").eq(j).removeClass("unli");
                    }
                  });
                }
              });
              
              if(!!$(".specul li").hasClass("lisel") && !!$(".speculs li").hasClass("lisel")) {
              
                //获取规格数值
                Ajax({
                  urls: "spec/getProduct.action?goods_id=" + goodsid + "&spec_value_ids=" + $(".specul .lisel").attr("specid") + "&spec_value_ids=" + $(".speculs .lisel").attr("specid"),
                  dataTypes: "json",
                  types: "get",
                  successes: function(datas) {
                    console.log(datas);
                    if(datas.res_code == 1) {
                      $("#pri").html(datas.res_data.product.price);
                      $("#stores").html(datas.res_data.product.store);
                      $(".selected").html("已选择" + "<span>" + $(".specul .lisel").html() + "</span><span>" + $(".speculs .lisel").html() + "</span>");
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  }
  SelectSpec();

  //取消规格
  $(".chacha").on("touchend", function(event) {
    event.preventDefault();
    $("#specboxs").hide();
  });
  
  //选择规格功能
  $(".specul").on("touchend", function(event) {
    event.preventDefault();
    
  });
  
  console.log(goodsid)

  //正则匹配numbox
  $("#numinput").on("input", function() {
    if(!/\d/.test($(this).val())) {
      $(this).val("");
    }
    if(/^0/.test($(this).val())) {
      $(this).val("");
    }
  });
  
  var num = 1;
  
  //加减功能
  $(".plus").on("touchend", function(event) {
    event.preventDefault();
    
    if(!$("#numinput").val()) {
      $("#numinput").val(num);
    } else {
      num++;
    }
    $("#numinput").val(num);
  });
  
  $(".minus").on("touchend", function(event) {
    event.preventDefault();
    
    if(!$("#numinput").val()) {
      num = 1;
      $("#numinput").val(num);
    } else {
      if(num > 1) {
        num--;
      }
    }
    $("#numinput").val(num);
  });

  //立即购买
  /* if((window.location.href).split("?")[1] == 2) {
    $(".buyingquick").html("兑奖");
  } */
  
  $(".containbtn").on("touchend", function() {
    
    //获取第一个规格和第二个规格
    var first = $(".specul .lisel").attr("specid");
    var second = $(".speculs .lisel").attr("specid");
    console.log(first, second)

    if(!!second) {
      if(first && second) {
        Ajax({
          urls: "widget?type=shop_cart&action=add&ajax=yes&flag=1&goodsid=" + goodsid + "&activityId=" + 10 + "&activityPrice=" + 10 + "&spec_value_ids=" + first + "&spec_value_ids=" + second + "&num=" + $("#numinput").val(),
          dataTypes: "json",
          types: "get",
          successes: function(json) {
            console.log(json);
            json = JSON.parse(json);
            if(json.result == 0){
    
              /* 添加失败 */

              var v = json.message;
              alert(v);

              if(v == "您尚未登录" ){
                window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
              }
              


            }else if(json.result == 1){
  
              if($("#specboxs").attr("main") == 1) {
                if((window.location.href).split("?")[1] == 2) {
                  location.href="http://wx.cheertea.com/checkout.html?2";
                } else {
                  location.href="http://wx.cheertea.com/checkout.html";
                }
              } else if($("#specboxs").attr("main") == 0) {
                $("#specboxs").hide();
                alert("加入购物车成功！");
                Ajax({
                        urls: "member/cart!getNum.do",
                        types: "get",
                        dataTypes: "json",
                        successes: function (data) {
                            var datas = JSON.parse(data);
                            console.log(datas);
            
                            // 实现数字的隐藏和显示
                            if(datas.res_data) {
                                if(parseInt(datas.res_data.num) >= 1) {
                                    $(".carnumber").html(datas.res_data.num);
                                    $(".carnumber").show();
                                } else {
                                    $(".carnumber").hide();
                                }
                            }
                        }
                    });
              }
            }
          }
        });
      } else {
        alert("请选择完整规格！");
      }
      
    } else {
      console.log(!$(".speculs li").length)
      if(!$(".speculs li").length) {
          if($(".specul .lisel").length) {
              Ajax({
                  urls: "widget?type=shop_cart&action=add&ajax=yes&flag=1&goodsid=" + goodsid + "&activityId=" + 10 + "&activityPrice=" + 10 + "&spec_value_ids=" + first + "&num=" + $("#numinput").val(),
                  dataTypes: "json",
                  types: "get",
                  successes: function(json) {
                      json = JSON.parse(json);
                      console.log(json);
                      if(json.result == 0){

                          /* 添加失败 */
                          var v = json.message;
                          alert(v);
                          if(v == "您尚未登录" ){
                              window.location.href = "login.html?forward=" + window.location.pathname + window.location.search;
                          }
                      }else if(json.result == 1){
                          if($("#specboxs").attr("main") == 1) {
                              if((window.location.href).split("?")[1] == 2) {
                                  location.href="http://wx.cheertea.com/checkout.html?2";
                              } else {
                                  location.href="http://wx.cheertea.com/checkout.html";
                              }
                          } else if($("#specboxs").attr("main") == 0) {
                              $("#specboxs").hide();
                              alert("加入购物车成功！");
                              Ajax({
                                  urls: "member/cart!getNum.do",
                                  types: "get",
                                  dataTypes: "json",
                                  successes: function (data) {
                                      var datas = data;
                                      console.log(datas);

                                      // 实现数字的隐藏和显示
                                      if(datas.res_data) {
                                          if(parseInt(datas.res_data.num) >= 1) {
                                              $(".carnumber").html(datas.res_data.num);
                                              $(".carnumber").show();
                                          } else {
                                              $(".carnumber").hide();
                                          }
                                      }
                                  }
                              });  
                          }
                      }
                  }
              });
          } else {
              alert("请选择规格！");
          }
      } else {
        alert("请选择完整规格！");
      } 
    } 
  });
  
  function buyquickly(){


      Ajax({


        urls : "widget?type=shop_cart&action=add&ajax=yes&flag=1",


        types : "get",


        datas:{


          goodsid:goodsid,


          activityId:10,

  
          activityPrice:10


        },


        dataTypes : "json",


        successes:function(json){


          if(json.result == 0){


            /* 添加失败 */


            var v = json.message;


            alert("请选择完整规格！");


          }else if(json.result == 1){

            if((window.location.href).split("?")[1] == 2) {
              location.href="http://wx.cheertea.com/checkout.html?2";
            } else {
              location.href="http://wx.cheertea.com/checkout.html";
            }


          }


        },


        error:function(json){


          console.log(json);


        }

    });

  };