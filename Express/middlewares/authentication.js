function authentication(req, res, next) {
    console.log('Authenticating.....');
    next();
}

export default authentication;

// function authentication(req, res, next){
//     res.send('Authenticating.....');
//     next();
// }

// export default authentication;