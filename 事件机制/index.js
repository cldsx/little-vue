
// 同步代码会先依次执行完。
// 同步代码执行完毕后，会先处理所有的微任务。微任务按照它们添加到微任务队列的顺序依次执行。
// 微任务处理完后，从宏任务队列中取出一个宏任务执行。
// 执行完一个宏任务后，再次检查微任务队列，若有微任务则继续执行，直到微任务队列为空。
// 然后再取下一个宏任务执行，重复上述过程。
function handleclick() {
    console.log('同步任务 1');

    setTimeout(() => {
        console.log('宏任务 1');
        Promise.resolve().then(() => {
            console.log('微任务 3');
        });
    }, 0);

    setTimeout(() => {
        console.log('宏任务 2');
    }, 0);

    Promise.resolve().then(() => {
        console.log('微任务 1');
    });

    Promise.resolve().then(() => {
        console.log('微任务 2');
    });

    console.log('同步任务 2');
}

//  同步任务 1
//  同步任务 2
//  微任务 1
//  微任务 2
//  宏任务 1
//  微任务 3
//  宏任务 2