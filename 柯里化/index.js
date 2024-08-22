function calculate(baseValue) {
    console.log(baseValue, "baseValue")
    return function (operation) {

        return operation(baseValue);
    };
}

const multiply = calculate(5);
console.log(multiply(x => x * 2));

// 闭包
function fn() {
    const a = 1
    return function () {
        console.log(a, "aaaa")
    }
}
a = 5
const cb = fn()
cb()