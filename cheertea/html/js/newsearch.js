var $ = require("./common/zepto");

var newSearch = {
    clickCancelbtn: function() {
        $(".cancelbtn").on("tap", function() {
            $(".searchinput").val("");
            $(this).hide();
        });
    },
    inputFun: function() {
        $(".searchinput").on("input", function() {

            //判断是否有值，显隐叉叉
            if($(this).val()) {
                $(".cancelbtn").show();
            } else {
                $(".cancelbtn").hide();
            }
        });
    },
    deleteArr: function(arrs) {
        var newsarr = [];
        var obj = {};

        for(var i = 0; i < arrs.length; i++) {
            if(!obj[arrs[i]]) {
                obj[arrs[i]] = 1;
                newsarr.push(arrs[i]);
            }
        }
        return newsarr;
    },
    localFun: function(arr) {
        var _this = this;
        var ls = window.localStorage;

        arr.push($(".searchinput").val());

        //数组去重
        var newarr = _this.deleteArr(arr);

        ls.setItem("searcharr", newarr);
    },
    searchBtn: function() {
        var _this = this;
        var arr = [];
        $(".searchbg").on("tap", function() {
            _this.localFun(arr);
        });
    },
    appendLi: function() {
        var ls = window.localStorage;
        var liarr = (ls.getItem("searcharr")).split(",");
        if(!!liarr) {
            $(".lastestsearchbox").show();

            $.each(liarr, function(i) {
                $(".lastestcontent").append(
                    "<li>" + liarr[i] + "</li>"
                );
            });
        }
    },
    clearBtn: function() {
        $(".clears").on("tap", function() {
            var ls = window.localStorage;
            ls.clear();
            $(".lastestsearchbox").hide();
            $(".lastestcontent").children().remove();
        });
    },
    clickAdd: function() {

        //点击添加到输入框
        $(".lastestsearchbox li").on("tap", function() {
            $(".searchinput").val($(this).html());

            //判断是否有值，显隐叉叉
            if($(".searchinput").val()) {
                $(".cancelbtn").show();
            } else {
                $(".cancelbtn").hide();
            }
        });
    },
    init: function() {

        //显示最近搜索
        this.appendLi();

        //完成输入框
        this.inputFun();

        //点击取消
        this.clickCancelbtn();

        //点击搜索
        this.searchBtn();

        //点击删除缓存
        this.clearBtn();

        //点击添加
        this.clickAdd();
    }
}
newSearch.init();