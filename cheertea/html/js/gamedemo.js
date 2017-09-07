;(function(win, doc) {
    var $ = require("./common/jquery.min");
    var gameDemo = {
        /**
         *
         * @param nums 需要运动的次数
         */
        moveLi: function(nums) {
            var _this = this;

            $(".libox").on("touchend", "li", function(event) {

                if( $(this).parent().hasClass("leftli")) {
                    _this.leftCount++;
                } else {
                    _this.rightCount++;
                }

                //获取当前libox的高度
                var liboxH = $(".libox").height();

                //获取当前bottom的高度
                var bottoms = +($(this).css("bottom").match(/\d+/g)[0]);

                $(this).animate({
                    bottom: bottoms + Math.floor(liboxH / nums) + "px"
                }, 100);

                //当计数器的数字等于nums / 2时
                !!(_this.leftCount >= Math.floor(nums / 2)) && _this.appendLi($(this));
                !!(_this.rightCount >= Math.floor(nums / 2)) && _this.appendLi($(this));

                //当计时器的数字大于等于nums时候，该块消失，分数增加
                _this.operateLi($(this), nums);
            });
        },
        /*实现添加li功能*/
        appendLi: function(liEle) {
            var _this = this;

            console.log($(".leftli").children().length, $(".rightli").children().length);

            //判断为哪边的li
            if(liEle.parent().hasClass("leftli") && !$(".rightli").children().length) {
                $(".rightli").append("<li></li>");
            } else if(liEle.parent().hasClass("rightli") && !$(".leftli").children().length) {
                $(".leftli").append("<li></li>");
            }
        },
        /*操作该块*/
        operateLi: function(liEle, nums) {
            if(liEle.parent().hasClass("leftli") && this.leftCount >= nums) {
                this.score++;
                liEle.remove();
                this.leftCount = 0;
            } else if(liEle.parent().hasClass("rightli") && this.rightCount >= nums) {
                this.score++;
                liEle.remove();
                this.rightCount = 0;
            }

            //添加分数
            $(".scorebox span").html(this.score);
        },
        /*设计倒计时*/
        countDown: function(number) {
            var _this = this;

            $(".timebox").html(number);
            var timer = setInterval(function() {
                number--;
                $(".timebox").html(number);

                if(number <= 0) {
                    clearInterval(timer);
                    alert("你的分数是" + _this.score);
                }
            }, 1000);
        },
        init: function() {

            //确定序列
            this.number = 1;

            //设置计数器
            this.leftCount = 0;
            this.rightCount = 0;

            //设置分数
            this.score = 0;

            this.moveLi(5);

            //设计倒计时
            this.countDown(60);

            document.querySelector('body').addEventListener('touchmove', function (ev) {
                ev.preventDefault();
            });
        }
    }
    gameDemo.init();
})(window, document);
