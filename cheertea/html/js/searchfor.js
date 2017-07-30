var $ = require("./common/zepto");
$(".del").on('touchstart',function(){
    $(".find").val("");
});



$('.search em').on('click',function(){
    var str2 = $('.find').val();
    var ls2 = window.localStorage;
    var b2 = ls2.getItem('a');
    if(str2){
        if(b2){
            var c2 = b2 + '!' + str2;
            ls2.setItem('a','');
            ls2.setItem('a',c2);
        }else{
            ls2.setItem('a',str2);   
        } 
    }
})

var ls1 = window.localStorage;
var a1 = ls1.getItem('a');
if(a1){
    var b1 = a1.split('!');
    for(var i = 0; i < b1.length; i++){
        var span = $('<span>').html(b1[i]);
        $('.span-box').append(span);
    }
}