
// 简易的原型
function testFun() {
    console.log('构造函数')
}
testFun.prototype.funAdd = function (a) {

    a++
    console.log('函数原型方法', a)
}
var fn1 = new testFun()


var fn2 = new testFun()

handleclick1 = function () {
    fn1.funAdd(1) // 2
}
handleclick2 = function () {
    fn2.funAdd(6) // 7
}