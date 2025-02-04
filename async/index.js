console.log("Loading....");

getUser(10, handleUser);

function handleUser(user) {
    console.log(user);
    getHandle(user.handle, handleHandle);
}

function handleHandle(name) {
    console.log(name);
    getRepo(name, displayRepo);
}

function displayRepo(repos) {
    console.log(repos);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Getting user....");
        callback({ id: id, handle: "whiteblueskyss" });
    }, 2000);
}

function getHandle(handle, callback) {
    setTimeout(() => {
        console.log("getting handle....");
        callback(handle);
    }, 2000);
}

function getRepo(name, callback) {
    console.log("getting repo....");
    callback(['repo1', 'repo2', name]);
}