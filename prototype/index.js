//原型链继承


function Parent() {
    this.balance = 100;    // 余额
    console.log(this, "parent的this")
}

Parent.prototype.useMoney = function (number) {    // 花钱的本领

    this.balance -= number;
    console.log(`花了${number}块`);
    console.log(`余额${this.balance}块`);
    console.log(this, "parent.prototype")
}

function Child() {    // 造好了构造函数
    console.log(this, "Child的this")
}

Child.prototype = new Parent();    // 将Child的原型对象换成new Parent()生成的对象

var child1 = new Child();    // 通过原型链，继承了余额以及花钱的本领


console.log(child1.__proto__.__proto__ == Parent.prototype)//true
console.log(Parent.prototype)
console.log(child1.balance);  // 你也有可以获取到balance这个属性
child1.useMoney(2);


// 盗用继承构造函数

// function Parent() {
//     this.balance = 50;    // 余额
// }

// Parent.prototype.useMoney = function (number) {    // 花钱的本领
//     this.balance -= number;
//     console.log(`花了${number}块`);
//     console.log(`余额${this.balance}块`);
// }

// function Child() {    // 造好了生产你的构造函数
//     Parent.call(this);    // 执行了 Parent 这个构造函数，call替换上下文环境为Child
// }
// // 每个实例内部相当于执行一遍this.balance=1000000000 实例之间不互相影响

// var child1 = new Child();    // 出生，继承了余额
// console.log(child1.balance);  // 有balance这个属性
// child1.useMoney(5);    // 报错，没有继承这个能力


