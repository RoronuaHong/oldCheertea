
//设置html的font-size
    var EventUtil = {
        addHandler: function(element, type, handler){
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
    };
    function change() {
        var window_w = document.documentElement.clientWidth;
        window_w = window_w > 640 ? 640 : window_w;
        //如果移动端设计稿是1920px的，window_w就除以19.2
        document.documentElement.style.fontSize = window_w / 6.4 + 'px';
    }
    change();
    //检测手机横竖屏
    EventUtil.addHandler(window, 'orientationchange', change);
    EventUtil.addHandler(window, 'resize', change);
    //屏幕尺寸变化
    // window.addEventListener('orientationchange',change,false);
    // window.addEventListener('resize',change,false);





