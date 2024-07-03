const diff = (newNode, oldNode, key) => {
    const newLen = newNode.length
    const oldLen = oldNode.length
    const add = []
    const remove = []
    const replace = []

    let n1 = 0
    let n2 = 0
    // 循环判断 如果 n1 < 新节点的长度 或者 n2 小于旧节点的长度，我们就开始循环
    while (n1 < newLen || n2 < oldLen) {
        // 新旧节点都存在
        if (newNode[n1] && oldNode[n2]) {
            // 如果 新 旧 节点相等，则不做处理
            if (newNode[n1] === oldNode[n2] && n1 === n2) {
                n1++
                n2++
                continue
            } else {
                // 在旧节点 查找 新节点是否存在，没有则说明不存在
                const result = findRange(
                    oldNode,
                    n2,
                    oldLen,
                    current => newNode[n1] === current
                )

                if (result) {
                    replace.push({
                        newIndex: n1,
                        oldIndex: result.index,
                        val: result.data
                    })
                    n1++
                    if (oldNode[n2] === oldNode[result.index]) {
                        n2++
                    }
                    continue
                } else {
                    add.push(newNode[n1])
                    n1++
                    continue
                }
            }
        }
        // 只有新节点存在
        if (newNode[n1]) {
            add.push(newNode[n1])
            n1++
            continue
        }
        // 只有旧节点存在
        if (oldNode[n2]) {
            const some = replace.some((item) => item.val === oldNode[n2])
            if (!some) {
                remove.push(oldNode[n2])
            }
            n2++
            continue
        }
    }
    return {
        add,
        remove,
        // 如果 2个数组一样，只是位置发生了改变，那应该返回之前的和之后的结果
        replace
    }

}
// 查找指定区间的结果
const findRange = (
    arr,
    start,
    end,
    callback
) => {
    let result = undefined

    for (let i = start; i < end; i++) {
        const find = callback(arr[i], i)

        if (find) {
            result = {
                data: arr[i],
                index: i
            }
            break
        }
    }

    return result
}


const res = diff([1, 2, 3], [2, 3, 4])
console.log(res)