class ManageGame {
    static _schedule = null

    static getInstance() {
        if (ManageGame._schedule) {        // 判断是否已经有单例了
            return ManageGame._schedule
        }
        return ManageGame._schedule = new ManageGame()
    }

    constructor() {
        if (ManageGame._schedule) {        // 判断是否已经有单例了
            return ManageGame._schedule
        }
        ManageGame._schedule = this
    }
}

const schedule1 = new ManageGame()
const schedule2 = ManageGame.getInstance()

console.log(schedule1 === schedule2)	// true


function Restaurant() { }

Restaurant.orderDish = function (type) {
    switch (type) {
        case '鱼香肉丝':
            return new YuXiangRouSi()
        case '宫保鸡丁':
            return new GongBaoJiDing()
        case '紫菜蛋汤':
            return new ZiCaiDanTang()
        default:
            throw new Error('本店没有这个 -。-')
    }
}
// 抽象工厂模式

/* 菜品抽象类 */
function Dish() { this.kind = '菜' }

/* 抽象方法 */
Dish.prototype.eat = function () { throw new Error('抽象方法不能调用!') }

/* 鱼香肉丝类 */
function YuXiangRouSi() { this.type = '鱼香肉丝' }

YuXiangRouSi.prototype = new Dish()

YuXiangRouSi.prototype.eat = function () {
    console.log(this.kind + ' - ' + this.type + ' 真香~')
}

/* 宫保鸡丁类 */
function GongBaoJiDing() { this.type = '宫保鸡丁' }

GongBaoJiDing.prototype = new Dish()

GongBaoJiDing.prototype.eat = function () {
    console.log(this.kind + ' - ' + this.type + ' 让我想起了外婆做的菜~')
}

const dish1 = Restaurant.orderDish('鱼香肉丝')
dish1.eat()
const dish2 = Restaurant.orderDish('红烧排骨')
