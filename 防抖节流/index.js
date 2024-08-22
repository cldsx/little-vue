// 清除定时器：注册的延迟不执行了
// 无论触发多少次，只执行最后一次
function debounce(fun, wait) {
    var timeout = null;
    return function () {
        console.log(timeout, "-----------")
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            fun.apply(this, arguments);
        }, wait)
    }
}


function throttle(fn, delay) {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
        // 在函数开头判断标记是否为true，不为true则return
        if (!canRun) return;
        // 立即设置为false
        canRun = false;
        // 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => {
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
            // 当定时器没有执行的时候标记永远是false，在开头被return掉
            fn.apply(this, arguments);
            canRun = true;
        }, delay);
    };
}

// 再一秒内如果执行多次，第二次的时候timer不为null,因此无法创建新的timer,需要等上次的执行完再赋null
function throttle2(func, delay) { // 定义节流函数，接收两个参数：要执行的函数和延迟时间
    let timer = null; // 初始化定时器变量
    return function (...args) { // 返回一个函数，用于封装要执行的函数
        const context = this; // 存储this
        if (!timer) { // 如果定时器不存在
            timer = setTimeout(function () { // 则创建定时器
                func.apply(context, args); // 执行函数，并传入参数
                timer = null; // 清空定时器变量
            }, delay); // 延迟一段时间后执行函数
        }
    };
}