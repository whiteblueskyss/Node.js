console.log("Loading....");

// getUser(10, function(user) {
//     console.log(user);
//     getHandle(user.handle, function(name) {
//         console.log(name);
//         getRepo(name, function(repos) {
//             console.log(repos);
//         });
//     });
// });

getUser(1)
    .then(user=>getHandle(user.handle))
    .then(handle=>getRepo(handle))
    .then(repo => console.log(repo))
    .catch(error => console.log(error));

async function displayRepo() {
    try{
        const user = await getUser(1);
    const handle = await getHandle(user.handle);
    const repo = await getRepo(handle);

    console.log(repo);
    }
    catch(error){
        console.log(error); 
    }
}
    
function getUser(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("Getting user....");
            resolve({ id: id, handle: "whiteblueskyss" });
        }, 2000);
    })
}


function getHandle(handle) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("getting handle....");
            resolve(handle);
        }, 2000);
    })
}


function getRepo(name) {
    return new Promise((resolve, reject)=>{
        console.log("getting repo....");
        resolve(['repo1', 'repo2', name]);
    })
}