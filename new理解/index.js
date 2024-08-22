// new 关键词的主要作用就是执行一个构造函数、返回一个实例对象

function Person() {
    this.name = 'Jack';
    return 'tom';
}

var p = myNew(Person);
// return 的不是一个对象时，那么它还是会根据 new 关键词的执行逻辑，生成一个新的对象（绑定了最新 this）
console.log(p)  // {name: 'Jack'}  new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象
console.log(p.name) // Jack



function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        throw 'fn must be a function';
    }
    // 1、用new Object() 的方式新建了一个对象obj
    // var obj = new Object()
    // 2、给该对象的__proto__赋值为fn.prototype，即设置原型链
    // obj.__proto__ = fn.prototype

    // 1、2步骤合并
    // 创建一个空对象，且这个空对象继承构造函数的 prototype 属性
    // 即实现 obj.__proto__ === constructor.prototype
    var obj = Object.create(fn.prototype);

    // 3、执行fn，并将obj作为内部this。使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
    var res = fn.apply(obj, args);
    // 4、如果fn有返回值，则将其作为new操作返回内容，否则返回obj
    return res instanceof Object ? res : obj;
};
