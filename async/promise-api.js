
const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("Async1....!");
        resolve(1);
    }, 2000);
})

const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('Async2....');
        // resolve(2);
        reject(new Error("Erroring...."))
    }, 2000);
})

Promise.race([p1,p2])
    .then(result=>console.log(result))
    .catch(error => console.log(error));