

export default {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                prttyDate: function (time) {

                    var date = new Date(time),
                        diff = (((new Date()).getTime() - date.getTime()) / 1000),
                        day_diff = Math.floor(diff / 86400);

                    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
                        return;

                    return day_diff == 0 && (
                        diff < 60 && "刚刚" ||
                        diff < 120 && "1分钟以前" ||
                        diff < 3600 && Math.floor(diff / 60) + "分钟以前" ||
                        diff < 7200 && "1小时以前" ||
                        diff < 86400 && Math.floor(diff / 3600) + "小时以前") ||
                        day_diff == 1 && "昨天" ||
                        day_diff < 7 && day_diff + "天以前" ||
                        day_diff < 31 && Math.ceil(day_diff / 7) + "周以前";
                },
                prttySize: function (size) {
                    console.log(size);
                    return size < 1000 && size + "b" ||
                        size < 1000_000 && (size / 1000).toFixed(2) + "k" ||
                        size < 1000_000_000 && (size / 1000_000).toFixed(2) + "m" ||
                        size < 1000_000_000_000 && (size / 1000_000_000).toFixed(2) + "g" || "未知";
                },
                //提示框
                alert: function (options) {
                    //动态创建
                },
                //确认框
                confirm: function (options) {

                },
                //消息提示
                msg: function (options) {

                }
            },
        })
    }
}