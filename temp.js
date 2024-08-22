





import obData from "./data.js"

var counter = (function () {
  var a = 0;
  function change(val) {
    a += val;
  }
  return {
    fun1: function () {
      change(1);
    },
    fun2: function () {
      change(2);
    },
    value: function () {
      return a;
    },
  };
})();

// console.log(counter.value());
// counter.fun1()
// console.log(counter.value());
// counter.fun1()
// console.log(counter.value());

/**---------------------------------------- */


// this指向
// 对象内部方法的this指向调用这些方法的对象，也就是谁调用就指向谁。
let obj = {
  name: "张三",
  obj1: function () {
    name = "李四";
    console.log(this.name);
  },
  obj2: {
    name: "张思",
    obj2C: function () {
      name = "李武-";
      console.log(this.name);
    },
  },
};

// obj.obj1() //张三 this指向obj
// obj.obj2.obj2C() //张思 obj2C()中this指向obj2

/* -------------------------------------------*/
// 箭头函数中的this
var holObj = {
  a: "hhh",
  fun1: () => {
    console.log("对象：", this);
  },
};
// 箭头函数作用域this不改变上下文

// holObj.fun1();

var show = () => {
  console.log(this)
}

var showObj = {
  name: 'showshow',
  show: () => {
    console.log(this)
  },
  show2: function () {
    console.log(this.name)
  }
}
// show(); //window
// showObj.show();//window
// showObj.show2();//showshow
/***************************************************** */
// 构造函数中的this
// 构造函数中的this是指向实例。
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  console.log(this);//this指向pp
}
// var pp=new Person("一啊啊","18","女");
// console.log(pp);

/******************************************************** */
// call,apply,bind
function fun3(n1, n2) {
  console.log("this指向", this);
  console.log("n1n2", n1, n2);
  console.log("arguments", arguments)
}
// fun3.call()
// var fnobj={
//     fn:fun3
// }
// fun3.call(fnobj,3,4)
/******************************************************** */
function Parent(name, age) {
  this.name = name;
  this.age = age;
  console.log("parent作用域里的this:", this);

}

// Children.prototype=Parent;

function Children(name, age, height) {
  this.height = height;
  console.log("children作用域里的thi1:", this);
  Parent.call(this, name, age);
  console.log("children作用域里的this2:", this);
}
// var cc= new Children("嗷嗷","23","171");

// cc.__proto__=Parent;

// console.log(cc.name,cc.age,cc.height);

/************************************************* */
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
function testName() {
  console.log("6000000");
}
var aa = document.getElementById("myinput")

aa.addEventListener("input", debounce(testName, 2000))


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

function handleScroll() {
  console.log('scroll event fired');
}

const throttledHandleScroll = throttle2(handleScroll, 1000);
window.addEventListener('click', throttledHandleScroll);

/************************************************************ */

function students(newId, newName) {
  this.id = newId;
  this.name = newName;
}
students.prototype.eat = function () {
  console.log("eat")
}
// var s =new students("01","老白")
// console.log(s.__proto__)

/************************************************************ */
function doit2(id, name, sex) {
  this.id = id;
  this.name = name;
  this.sex = sex;
}

function dododo(id, name, sex, height) {
  this.height = height;
  doit2.call(this, id, name, sex);
  console.log("dododo里的this", this);
}
// var do1 = new dododo("01", "张阿斯", "女", "165");
// doit2.call(do1,"02","张阿空","女")
// console.log(do1);


/************************************************************ */

// 原型继承

var person = {
  friends: ["a", "b", "c", "d"]
}

var p1 = Object.create(person)

p1.friends.push("aaa")//缺点：子类的实例共享了父类构造函数的引用属性

// console.log(p1);
// console.log(person);//缺点：子类的实例共享了父类构造函数的引用属性


// function Father(name) {
//   this.name = name
//   this.hobby = ["篮球", "足球", "乒乓球"]
// }

// Father.prototype.getName = function () {
//   console.log(this.name);
// }

// function Son(name, age) {
//   Father.call(this, name)
//   this.age = age
// }
// var ss = new Son("张三","17");

/************************************************************ */
Function.prototype.myCall = function (context) {
  // 先判断调用myCall是不是一个函数
  // 这里的this就是调用myCall的
  if (typeof this !== 'function') {
    throw new TypeError("Not a Function")
  }
  console.log(context, "thisthis");
  // 不传参数默认为window
  context = context || window

  // 保存this
  context.fn = this
  console.log(context, "++++++")
  // 保存参数
  let args = Array.from(arguments).slice(1)   //Array.from 把伪数组对象转为数组
  console.log(args, "=======")
  // 调用函数
  let result = context.fn(...args)
  delete context.fn

  return result

}
function fun4(n2) {
  this.age = n2;
  console.log("this指向", this);
  console.log("n1n2", n2);
  console.log("arguments", arguments)
}
var fun4Obj = {
  name: '嗷嗷嗷',
}
// fun4.myCall(fun4Obj,"24");
// console.log(fun4Obj)


/************************************************************ */


var solderObj = {
  attack: function () {
    console.log("11")
  },
  run: function () { },
  defend: function () { }
}

var solderList = [];
var solder;
for (var i = 0; i < 5; i++) {
  solder = {
    id: i,
  }
  solder.__proto__ = solderObj;
  solderList.push(solder);
}
// solderList[3].attack()
// console.log(solderList,"0000")

function soldier(id) {
  var tempObj = {};


  tempObj.__proto__ = soldier.prototype;

  tempObj.id = id;
  tempObj.life = "45";
  return tempObj;
}

soldier.prototype = {
  attack: function () {
    console.log("222")
  },
  run: function () { },
  defend: function () { }
}

var soldierList = [];
for (var i = 0; i < 5; i++) {
  soldierList.push(soldier(i));
}
// console.log(soldierList)






/************************************************************ */

function Star(uname, age) {
  this.uname = uname;
  this.age = age;            //公共属性

}
Star.prototype.sing = function () {
  console.log('我会唱歌');    //公共方法
}

var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);

// ldh.sing();
// zxy.sing();

/************************************************************ */
//原型的终极应用
var myObj = function () {
  return myObj.prototype.init();
}
myObj.prototype.init = function () {
  return this;
}

//init是myObj.prototype调用，因此里面this指向myObj.prototype
console.log(myObj.prototype.init() == myObj.prototype)//true

//个人理解，new myObj() 其实就是取myObj.prototype
var aa = new myObj();
console.log(new myObj() == myObj())//true
console.log(aa.init() == myObj.prototype.init());//true

/************************************************************ */

var myNew = function (fn, ...args) {
  var obj = {};
  obj.__proto__ = fn.prototype;

  var result = fn.apply(obj, args);

  return result instanceof Object ? result : obj
}

var testFun = function (name) {
  this.name = name;

}
testFun.prototype.attack = function () {
  console.log("attack");
}
var testOb = myNew(testFun, "aa");
// console.log(testOb);

/************************************************************ */

// setTimeout(() => {
//   console.log('1');
//   new Promise(function (resolve, reject) {
//     console.log('2');
//     setTimeout(() => {
//       console.log('3');
//     }, 0);
//     resolve();
//   }).then(function () {
//     console.log('4')
//   })
// }, 0);
// console.log('5'); //5 7 10 8 1 2 4 6 3
// setTimeout(() => {
//   console.log('6');
// }, 0);
// new Promise(function (resolve, reject) {
//   console.log('7');
//   // reject();
//   resolve();
// }).then(function () {
//   console.log('8')
// }).catch(function () {
//   console.log('9')
// })
// console.log('10');
/************************************************************ */

function createSingleton(fn) { // 创建一个返回单例对象的函数
  let instance = null; // 定义一个变量用来存储单例实例
  return function (...args) { // 返回一个函数
    if (instance === null) { // 如果单例实例不存在，则创建一个新的实例
      instance = new fn(...args);
    }
    return instance; // 返回单例实例
  };
}

function test1(name) {
  this.name = name;
}

var test2 = createSingleton(test1);

// var aa=new test2("aaaaa");

// var bb=new test2("bbbbb");
// console.log(aa.name);
// console.log(bb.name);

/***************************************************************** */
class MyPromise {
  constructor(executor) { // 接受一个executor函数作为参数
    this.status = 'pending'; // 初始化状态为pending
    this.value = undefined; // 初始化结果值为undefined
    this.reason = undefined; // 初始化错误原因为undefined
    const resolve = value => { // 定义resolve函数用于将状态变为resolved
      if (this.status === 'pending') { // 只有当前状态是pending才能变为resolved
        this.status = 'resolved'; // 状态变为resolved
        this.value = value; // 存储结果值
      }
    };

    const reject = reason => { // 定义reject函数用于将状态变为rejected
      if (this.status === 'pending') { // 只有当前状态是pending才能变为rejected
        this.status = 'rejected'; // 状态变为rejected
        this.reason = reason; // 存储错误原因
      }
    };

    try {
      executor(resolve, reject); // 执行executor函数，并传入resolve和reject函数
    } catch (error) {
      reject(error); // 如果executor函数执行出错，直接将状态变为rejected
    }
  }

  then(onResolved, onRejected) {
    // 定义then方法，接受两个回调函数作为参数
    if (this.status === 'resolved') { // 如果当前状态已经是resolved
      onResolved(this.value); // 直接调用onResolved回调函数，并传入结果值
    } else if (this.status === 'rejected') { // 如果当前状态是rejected
      onRejected(this.reason); // 直接调用onRejected回调函数，并传入错误原因
    } else {
      onResolved("gggggggggg");
    }
  }

  catch(onRejected) { // 定义catch方法，接受一个回调函数作为参数
    if (this.status === 'rejected') { // 如果当前状态是rejected
      onRejected(this.reason); // 直接调用onRejected回调函数，并传入错误原因
    }
  }
}


const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // console.log('async task finished');
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {

      resolve(randomNumber);

    } else {
      reject(new Error('random number is too small'));
    }
  }, 1000);
});

promise.then(res => {

  // console.log('result:', res);
})

/************************************************************************ */

var newData = [];
var sortt = function (data) {
  if (data.length % 2 == 0) {
    newData.push(data[data.length - 1]);
    data.splice(data.length - 1, 1);
  } else {
    newData.push(data[0]);
    data.splice(0, 1);
  }
  if (data.length == 0) {
    return newData;
  } else {
    return sortt(data);
  }

};
// console.log(JSON.stringify(sortt([1,2,3,4,5,6])) ,"=====")

console.log(obData);



// var sortt =function(n){
//   return function sortt(){
//      return function sortt(){
//         return function sortt(){
//             return 1;
//         }
//      }
//   }
// }

// var sortt =function(n){
//    function sortt(){
//       function sortt(){
//          function sortt(){
//             return 1;
//         }
//      }
//   }
// }


function toprom() {
  window.location.href = "pages/promtime.html"
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function observe(data) {

  // vue中数组和对象是分开处理
  if (!isObject(data)) return;
  new Observe(data);
}
class Observe {
  constructor(value) {
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key);
    });
  }
}

function defineReactive(obj, key) {
  // 这里初始化的时候数据默认都没有getter
  // 递归观测data中的数据是否为对象
  observe(obj)
  let val = obj[key]
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newValue) {
      if (val === newValue) return;
      // 递归检测设置的值是否为对象
      observe(newValue)
      val = newValue
    }
  })
}
// var vv={
//   a:"a",
//   b:'b',
//   c:'c'
// }
// observe(vv);