
function log(req, res, next){
    console.log("Logging....");
    next();
}

export default log;