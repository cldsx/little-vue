// 数据校验
let user = {
    name: '',
    age: 0
};

let validator = {
    set: function (obj, item, value) {
        console.log(obj, item, value)
        if (item === 'name' && (typeof value !== 'string' || value.length === 0)) {
            console.error('名字必须为非空字符串');
            return;
        }
        if (item === 'age' && (typeof value !== 'number' || value < 0 || value > 150)) {
            console.error('年龄必须是 0 到 150 之间的数字');
            return;
        }
        obj[item] = value;
        return true;
    }
};

let proxyUser = new Proxy(user, validator);
function handleDataValidator() {
    proxyUser.name = 123;  // 输出错误：名字必须为非空字符串
    proxyUser.age = -5;  // 输出错误：年龄必须是 0 到 150 之间的数字
}

// 懒加载
let data = {
    heavyData: null
};

let lazyLoader = {
    get: function (obj, item) {
        console.log(obj, item)
        if (item === 'heavyData' && obj[item] === null) {
            console.log('正在加载繁重数据...');
            obj[item] = '这是加载后的繁重数据';
        }
        return obj[item];
    }
};

let proxyData = new Proxy(data, lazyLoader);
function handlelazyLoader() {
    console.log(proxyData.heavyData);
}


// 访问控制
let secretInfo = {
    password: '123456'
};

let accessController = {
    get: function (obj, item) {
        if (item === 'password') {
            console.error('无权访问密码');
            return;
        }
        return obj[item];
    },
    set: function (obj, item, value) {
        if (item === 'password') {
            console.error('无权修改密码');
            return;
        }
        obj[item] = value;
        return true;
    }
};

let proxyInfo = new Proxy(secretInfo, accessController);

function handleSecurity() {
    console.log(proxyInfo.password);  // 输出错误：无权访问密码
    proxyInfo.password = '654321';  // 输出错误：无权修改密码
    proxyInfo.pass = '123456'
    console.log("secretInfo", secretInfo)
}
