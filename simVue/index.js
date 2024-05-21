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
                    debugger
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
    constructor(value) {
        debugger
    }
}