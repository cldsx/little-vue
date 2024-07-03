class Vue {
    constructor(options) {
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2. 把data中的成员转换成getter和setter，注入到vue实例中
        this._proxyData(this.$data)
        // 3. 调用observer对象，监听数据的变化
        new Observer(this.$data)
    }
    _proxyData(data) {
        Object.keys(data).forEach((key) => {
            console.log('this', this)
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newVal) {
                    if (newVal === data[key]) {
                        return
                    }
                    data[key] = newVal
                }
            })
        })
    }
}

class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })

    }
    defineReactive(obj, key, val) {
        // data数据 count 100
        console.log(obj, key, val)
        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        this.walk(val)
        Object.defineProperty()

    }
}

class Dep {
    constructor() {
        // 存储所有的观察者
        this.subs = []
    }
    // 添加观察者
    addSub(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 发送通知
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}