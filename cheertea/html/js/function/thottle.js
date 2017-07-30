
var thottle = module.exports = {
    init: function(context, fn, duration, delay) {
        var context = this;
        var args = arguments;
        var startTime = +new Date();

        return function() {
            var endTime = +new Date();

            if(endTime - startTime > duration) {

                //直接执行
                fn.apply(this, args);
                startTime = endTime;

            } else {
                clearTimeout(fn.timer);
                fn.timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            }
        }
    }
}
