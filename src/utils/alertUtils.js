import { appStore } from "../store/appStore";

const alert = function (msg, options) {
    var options = {
        type: "info",
        timeout: 2000,
        ...options,

    }
    console.log("弹框提示")
    var store = appStore()
    store.sysInfo.alert.unshift({
        msg: msg,
        ...options
    })
    if (store.sysInfo.alert.length > 5) {
        store.sysInfo.alert.pop();
    }

    setTimeout(() => {
        store.sysInfo.alert.pop();
    }, options.timeout)
}

const success = (msg) => {
    alert(msg, { type: "success" });
}

const info = (msg) => {
    alert(msg, { type: "info" });
}
const error = (msg) => {
    alert(msg, { type: "error" });
}
const warning = (msg) => {
    alert(msg, { type: "warning" });
}

export default {
    alert, success, info, error, warning
}



