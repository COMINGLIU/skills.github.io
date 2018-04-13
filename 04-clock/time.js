(function(document) {
    // 把document保存为局部变量
    var doc = document;
    // 所需元素,timer表示定时器
    var ele = {
        eleHour: doc.getElementsByClassName("hour")[0],
        eleMin: doc.getElementsByClassName("min")[0],
        eleSec: doc.getElementsByClassName("sec")[0],
        timer: null
    };
    // Time构造函数
    function Time(hour,min,sec) {
        this.hour = hour;
        this.min = min;
        this.sec = sec;
    }
    // 由于对Time原型重新，所以需要指定Time原型的constructor属性指向Time
    Object.defineProperty(Time.prototype,"constructor",{
        enumerable: false,
        value: Time
    })
    // Time原型，用于保存下列方法
    Time.prototype = {
        // 设置时针转动的度数
        setHourT: function() {
            return this.hour*30+0.5*this.min+0.5/60*this.sec;
        },
        // 设置分针转动的度数
        setMinT: function() {
            return this.min*6+0.1*this.sec;
        },
        // 设置秒针转动的度数
        setSecT: function() {
            return this.sec*6;
        }
    };
    // 每隔一秒钟重新获取一次时间
    ele.timer = setInterval(function() {
        var nowTime = new Date(),
            h = nowTime.getHours();
            m = nowTime.getMinutes();
            s = nowTime.getSeconds();
        var time = new Time(h,m,s);
        ele.eleSec.style.transform = "rotate("+ time.setSecT() + "deg)";
        ele.eleMin.style.transform = "rotate("+time.setMinT() + "deg)";
        ele.eleHour.style.transform = "rotate("+time.setHourT() + "deg)";
    },1000)
    // 清除定时器
    return function() {
        clearInterval(ele.timer);
    }
})(document);

// 顺便复习下
// var time = new Date();
// time.getFullYear();time.getYear();
// time.getMonth();
// time.getData();
// time.getHours();
// time.getMinutes();
// time.getSeconds();
// time.getMilliseconds();










