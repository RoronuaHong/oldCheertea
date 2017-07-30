var $ = require("./common/zepto");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();

var html ='<div class="mid"> <div class="news"> <img class="logo" src="../anta.png" alt="" /> <h3 class="name">安踏时尚专卖店</h3> <span class="where"><img src="../wz.png" alt="" /></span> <em class="address">福建.厦门</em> <span class="sale">月销量 :</span> <span class="sale1"><em>2002</em>件</span> </div> <img class="commodity1" src="../anta1.png" alt="" /> <img class="commodity" src="../anta1.png" alt="" /> <img class="commodity" src="../anta1.png" alt="" /> </div>'
var html1 ='<div class="more">加载更多 ></div>'
    $(".Searchshopswrap").append(html);
    $(".Searchshopswrap").append(html1);
