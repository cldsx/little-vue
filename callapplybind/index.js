

function person(name, age) {
    this.name = name
    this.age = age
    console.log(this.time, 'person的this')
}
function person2(time) {
    this.time = time
    person.call(this, '张三', '7岁')
    console.log(this.name, this.age, "person2的this")
}
person2(1000)

Function.prototype.myCall = function (context) {
    // 先判断调用myCall是不是一个函数
    // XXX.myCall() 根据上述谁调用this就指向谁，这里this指向XXX
    if (typeof this !== 'function') {
      throw new TypeError("Not a Function")
    }
    // 不传参数默认为window
    context = context || window
  
    // 保存this
    context.fn = this
    // 保存参数
    let args = Array.from(arguments).slice(1)   //Array.from 把伪数组对象转为数组
    // 调用函数
    let result = context.fn(...args)
    delete context.fn
  
    return result
  
  }
  function fun4(n2) {
    this.age=n2;
  }
  var fun4Obj={
    name:'嗷嗷嗷',
  }
  fun4.myCall(fun4Obj,"24");//fun4中的this指向fun4Obj
  console.log(fun4Obj) //{name: '嗷嗷嗷', age: '24'}