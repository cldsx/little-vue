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
obj.obj1() //张三 this指向obj
obj.obj2.obj2C() //张思 obj2C()中this指向obj2


// 箭头函数作用域this不改变上下文

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
show(); //window
showObj.show();//window
showObj.show2();//showshow

/**改变this指向 */
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    console.log(this);//this指向pp Person {name: '一啊啊', age: '18', sex: '女'}
}
var pp = new Person("一啊啊", "18", "女");
console.log(pp);//Person {name: '一啊啊', age: '18', sex: '女'}


function doit2(id, name, sex) {
    this.id = id;
    this.name = name;
    this.sex = sex;
}

function dododo(id, name, sex, height) {
    this.height = height;
    doit2.call(this, id, name, sex);
    console.log("dododo里的this", this);//创建实例之后，this指向实例do1
}

var do1 = new dododo("01", "张阿斯", "女", "165");
//打印结果
//dododo里的this dododo {height: '165', id: '01', name: '张阿斯', sex: '女'}

//   等同于
function doit2(id, name, sex) {
    this.id = id;
    this.name = name;
    this.sex = sex;
}

function dododo(id, name, sex, height) {
    this.height = height;
}

var do1 = new dododo("01", "张阿斯", "女", "165");
doit2.call(do1, "02", "张阿空", "女")
console.log(do1);
  //打印结果
  //dododo {height: '165', id: '02', name: '张阿空', sex: '女'}