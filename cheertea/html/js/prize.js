var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var DateSelector = require("./function/DateSelector");
var imgchange = new imgChange();
require("./common/echo.js");

require("./common/touch");

var imgurl = "http://images.cheertea.com/";

if(window.location.host == "wx.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else if(window.location.host == "test.cheertea.com") {
    imgurl = "http://images.cheertea.com/";
} else {
    imgurl = "../images/";
}

$(".my").on("tap",function(){
  $(".isDeletes").show();
});

var prize = function() {
    // var _this = this;
    // this.newimgchange = new newimgChange();
    // this.swiperfun = new swiperFun();

    if(this instanceof prize) {

    } else {
        return new prize();
    }
}
prize.prototype = {
    prizeBtn: function() {
        var _this = this;

        //获取当前月份
        var nowMonth = ((new Date()).getMonth() + 1) > 12 ? 1 : (new Date()).getMonth() + 1;

        console.log(nowMonth);

        new DateSelector({
            input : 'date-selector-input',
            container : 'targetContainer',
            type : 0,
            param : [1,1,0,0,0],
            beginTime : [(new Date()).getFullYear(), 5],
            endTime : [(new Date()).getFullYear(), nowMonth],
            recentTime : [(new Date()).getFullYear(), nowMonth],
            success : function(arr){
                $("#years").val(arr[0]);
                $("#months").val(arr[1]);
                $(".prize-list3 dl dd").remove();

                $(".prize-list2 dl dt.t1 span").eq(0).addClass("active").siblings("span").removeClass("active");
                _this.init($("#years").val(), Number($("#months").val()));
            }
        });

        // console.log($("select[name=yearss] option").not(function(){ return !this.selected }).text())
        return this;
    },
    init: function(year, month) {
        var _this = this;
        $(document).ready(function(){
            console.log(year, month)
            // var datas = {};
            var all_prize = {};
            var all_mygroup = {};
            //我的中奖列表type=group_lucky&ajax=yes&action=drawResultSelf 
              Ajax({
                urls:"widget?type=group_lucky&ajax=yes&action=drawResultSelf",
                types:"get",
                dataTypes:"json",
                datas: {
                    year: year,
                    month: month
                },
                beforeSends: function() {
                      $(".isDelete").show();
                     $(".loading").show();
                     console.log("加载ing");
                  },
                successes: function(data){
                  var datas = JSON.parse(data);
                  console.log(datas);
                   /* $(".isDelete").hide();
                    $(".loading").hide();*/
                    console.log(1)
                    $(".prize-banner").children().remove();
                    $(".all-prize").eq(0).hide();
                    $(".prize-list").hide();
                   if(datas==null || datas.data==null ||datas.data.length==0){
                       $(".all-prize").eq(0).hide();
                       $(".prize-list").hide();
                         $(".prize-banner").show();
                        $(".prize-banner").append(
                            "<img src='" + imgurl + "logobgs.png' data-src=" + imgurl + "prize-banner.jpg" + " alt=''>" 
                          );
                        // $(".prize-banner").find("img").attr("src","../prize-banner.jpg");
                        return;
                    }else{
                       $(".all-prize").eq(0).show();
                       $(".prize-list").show();
                      $(".prize-banner").show();
                      $(".prize-banner").append(
                         "<img src='" + imgurl + "logobgs.png' data-src=" + imgurl + "prize-banner01.jpg" + " alt=''>" 
                        );
                      // $(".prize-banner").find("img").attr("src","../prize-banner01.jpg");
                    }
                    $(".prize-list dl dd").remove();
                  $.each(datas.data,function(i){
                    var prize1_img = null;
                    if(datas.data[i].grade==1){
                      prize1_img = 'prize1.png';
                    } else if(datas.data[i].grade==2){
                      prize1_img = 'prize2.png';
                    }else if(datas.data[i].grade==3){
                      prize1_img = 'prize3.png';
                    }else if(datas.data[i].grade==4){
                      prize1_img = 'prize4.png';
                    }else if(datas.data[i].grade==5){
                      prize1_img = 'prize5.png';
                    };
                      var img1 = datas.data[i].members[0].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].members[0].weixin_face;
                      var img2 = datas.data[i].members[1].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].members[1].weixin_face;
                      var img3 = datas.data[i].members[2].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].members[2].weixin_face;
                      $(".prize-list dl").append(
                          "<dd>" + 
                            "<ul>" +
                              "<li>" + datas.data[i].id + "</li>" +
                              "<li>" + datas.data[i].groupId + "</li>" +
                              "<li>" + 
                                "<span>" + 
                                  "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(img1) + " alt=''>" + 
                                  "<em>" + "ID："+ (!!datas.data[i].members[0] && datas.data[i].members[0].member_id) + "</em>" +
                                "</span>" +
                                "<span>" + 
                                  "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(img2) + " alt=''>" + 
                                  "<em>" + "ID："+ (!!datas.data[i].members[1] && datas.data[i].members[1].member_id) + "</em>" +
                                "</span>" +
                                "<span>" + 
                                  "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(img3) + " alt=''>" + 
                                  "<em>" + "ID："+ (!!datas.data[i].members[2] && datas.data[i].members[2].member_id) + "</em>" +
                                "</span>" +
                              "</li>" + 
                              "<li>" +
                                 "<img src='" + imgurl + "logobgs.png' data-src="+ imgurl + prize1_img + " alt=''>" + 
                              "</li>" + 
                            "</ul>" +
                          "</dd>"
                        )
                      Echo.init({
                      offset: 200,
                      throttle: 200
                    });
                  });
                }
              });
         //所有中奖列表type=group_lucky&ajax=yes&action=drawResult
          function getAjax(pages, pageSizes, grades, year, month) {
                Ajax({
                urls:"widget?type=group_lucky&ajax=yes&action=drawResult",
                types:"get",
                dataTypes:"json",
                datas: {
                    page: pages,
                    pageSize: pageSizes,
                    grade: grades,
                    year: year,
                    month: month
                },
                beforeSends: function() {
                  $(".isDelete").show();
                  $(".loading").show();
                },
                successes: function(data){
                  all_prize = JSON.parse(data);
                    console.log(all_prize);
                  $(".prize-list2 dl dd").remove();
                   $(".page em").remove();
                  if(grades == 4){
                      $(".prize4-page em").remove();
                      if(all_prize.pageCounts==1){
                        $(".prize4-page").hide();
                      }else{
                        for (var i = 1; i <= all_prize.pageCounts; i++) {
                          $(".prize4-page span").last().before("<em>" + i + "</em>");
                         }
                      }
                      $(".prize4-page em").eq(pages - 1).addClass("active");
                  }else if(grades == 5){
                     $(".prize5-page em").remove();
                     if(all_prize.pageCounts==1){
                        $(".prize5-page").hide();
                          return;
                      }else{
                        for (var i = 1; i <= all_prize.pageCounts; i++) {
                          $(".prize5-page span").last().before("<em>" + i + "</em>")
                        }
                      }
                      $(".prize5-page em").eq(pages - 1).addClass("active");
                  }
                  $.each(all_prize.data, function(i){
                      var img1 = all_prize.data[i].members[0].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : all_prize.data[i].members[0].weixin_face;
                      var img2 = all_prize.data[i].members[1].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : all_prize.data[i].members[1].weixin_face;
                      var img3 = all_prize.data[i].members[2].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : all_prize.data[i].members[2].weixin_face;
                      $(".prize-list2 dl").append(
                          "<dd>" + 
                            "<ul>" + 
                              "<li>" + all_prize.data[i].id + "</li>" +
                              "<li>" + all_prize.data[i].groupId + "</li>" +
                              "<li>" + 
                                "<span>" + 
                                  "<img src=" + imgchange.show(img1) + " alt=''>" + 
                                  "<em>" + "ID：" + (!!all_prize.data[i].members[0] && all_prize.data[i].members[0].member_id) + "</em>" +
                                "</span>" +
                                "<span>" + 
                                  "<img src=" + imgchange.show(img2) + " alt=''>" + 
                                  "<em>" + "ID：" + (!!all_prize.data[i].members[1] && all_prize.data[i].members[1].member_id) + "</em>" +
                                "</span>" +
                                "<span>" + 
                                  "<img src=" + imgchange.show(img3) + " alt=''>" + 
                                  "<em>" + "ID：" + (!!all_prize.data[i].members[2] && all_prize.data[i].members[2].member_id) + "</em>" +
                                "</span>" +
                              "</li>" + 
                          "</ul>" +
                        "</dd>"
                        )       

                   if(all_prize.data[i].isContain == true){
                     $(".prize-list2 dl dd").eq(i).addClass("on");
                    }                              
                  });
                   Echo.init({
                      offset: 200,
                      throttle: 200
                    }); 

                },
                completes: function () {
                    $(".isDelete").hide();
                    $(".loading").hide();
                },
                error: function(data){
                  console.log(data);
                }
              })
            }
            getAjax(1, 10, 1, $("#years").val(), $("#months").val());
            var _index = 0;
            $(".prize-list2 dl dt.t1 span").on("tap", function() {
                if($(this).hasClass("active")){
                  return;
                }else{
                  _index = $(this).index()+1;
                  $(this).addClass("active").siblings("span").removeClass("active");
                  getAjax(1, 10, _index,  $("#years").val(), $("#months").val());
                  if(_index==4){
                      $(".prize4-page").show().siblings(".page").hide();
                  }
                  if(_index==5){
                      $(".prize5-page").show().siblings(".page").hide();
                  }else if( _index != 4 && _index != 5){
                      $(".page").hide();
                  }
                }
            });
            $(".prize4-page").on("tap","em", function() {
              if($(this).hasClass("active")){
                  return;
                }else{
                  getAjax($(this).index(), 10, _index,  $("#years").val(), $("#months").val());
                  $(".prize4-page em").eq($(this).index()-1).addClass("active").siblings("em").removeClass("active");
              }
            });
             $(".prize5-page").on("tap","em", function() {
                if($(this).hasClass("active")){
                  return;
                }else{
                  getAjax($(this).index(), 10, _index,  $("#years").val(), $("#months").val());
                  $(".prize5-page em").eq($(this).index()-1).addClass("active").siblings("em").removeClass("active");
                }
              })

            //我参加的团
          function getGroudAjax(groud_pages, groud_pageSizes, groud_grades, year, month) {
            Ajax({
                urls:"widget?type=group_lucky&ajax=yes&action=queryMyGroup",
                types:"get",
                dataTypes:"json",
                datas: {
                  page: groud_pages,
                  pageSize: groud_pageSizes,
                  grade: groud_grades,
                  year: year,
                  month: month
                },
                beforeSends: function() {
                  $(".isDelete").show();
                  $(".loading").show();
                },
                successes: function(data){
                  all_mygroup = JSON.parse(data);
                    console.log(all_mygroup);
                  var id_num = (groud_pages-1)*5+1;
                  var id_nums = 0;
                  $.each(all_mygroup.data, function(i){
                    var img_src;
                    id_nums = id_num+i;
                    $(".prize-list3 dl").append(
                          "<dd>" + 
                            "<ul>" + 
                              "<li>" + id_nums + "</li>" +
                              "<li>" + all_mygroup.data[i].group_id + "</li>" +
                              "<li>" + "</li>" +
                          "</ul>" +
                        "</dd>"
                        )  
                    $.each(all_mygroup.data[i].membersList,function(j){
                      img_src = all_mygroup.data[i].membersList[j].weixin_face == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : all_mygroup.data[i].membersList[j].weixin_face;
                       $(".prize-list3 dl li").last().append(
                          "<span>" + 
                            "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(img_src) + " alt=''>" + 
                            "<em>" + "ID：" + all_mygroup.data[i].membersList[j].member_id + "</em>" +
                          "</span>" 
                        )  
                    })
                   if(all_mygroup.data[i].isLucky == true){
                      var prize_group_img = null;
                      if(all_mygroup.data[i].grade==1){
                        prize_group_img = 'prize1_color.png';
                      } else if(all_mygroup.data[i].grade==2){
                        prize_group_img = 'prize2_color.png';
                      }else if(all_mygroup.data[i].grade==3){
                        prize_group_img = 'prize3_color.png';
                      }else if(all_mygroup.data[i].grade==4){
                        prize_group_img = 'prize4_color.png';
                      }else if(all_mygroup.data[i].grade==5){
                        prize_group_img = 'prize5_color.png';
                      };
                      var groud_pagesNum = (groud_pages-1)*5+i;
                     $(".prize-list3 dl dd").eq(groud_pagesNum).addClass("active");
                       $(".prize-list3 dl dd").eq(groud_pagesNum).find("ul").append(
                          "<li>" + 
                            "<img src='" + imgurl + "logobgs.png' data-src="+ imgurl + prize_group_img + " alt=''>" + 
                          "</li>"
                          )
                    }   
                    Echo.init({
                      offset: 200,
                      throttle: 200
                    });                          
                  });
                 
                  if(num == all_mygroup.pageCounts) {
                    $(".group_page").hide();
                    boolean = false;
                    return;
                  };
                  $(".group_page").show();
                  boolean = true;
                },
                completes: function () {
                  $(".isDelete").hide();
                  $(".loading").hide();
                },
                error: function(data){
                  console.log(data);
                }
              });
          }
         
         var downrange = 10; 
         var num = 1; //初始页码
         var maxnum = num + 1000; //设置加载次数
         var $main = $(".prize-list3 dl "); //主体
         var totalheight = 0;
         var boolean = true;
         getGroudAjax(num,5,1, $("#years").val(), $("#months").val());
         function ifLoad() {
         var scrolltotop = parseFloat($(window).scrollTop());
         var winheight = parseFloat($(window).height());
         var conheight = parseFloat($(document).height()) - downrange;
         totalheight = scrolltotop + winheight;
         if (totalheight >= conheight && num != maxnum) {
            if(boolean) {
              num++;
              boolean = false;
              getGroudAjax(num,5,1,  $("#years").val(), $("#months").val());
            }
           }
         }

         $(window).off("scroll").on("scroll", ifLoad);
          $(".group_page").on("touchend", function(){
            num++;
            getGroudAjax(num,5,1,  $("#years").val(), $("#months").val());
          });
      });

        var islogin = islogins.showFocus();
            if(!islogin) {
                window.location.href = "http://wx.cheertea.com/login.html?forward=member_index.html";
            }
      return this;
    }
}
var prize = new prize();
prize.init($("#years").val(), Number($("#months").val())).prizeBtn();
