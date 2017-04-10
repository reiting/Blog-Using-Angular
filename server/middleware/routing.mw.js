exports.isAsset = function(path) {
    var pieces = path.split("/");
    if(pieces.length == 0) {
        return false;
    }
    if(path.indexOf("/api") !== -1 || path.indexOf("/?") !== -1) {
        return true;
    }
    if(pieces[pieces.length - 1].indexOf(".") !== -1) {
        return true;
    }
    return false;
}
exports.isLoggedIn = function(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

exports.isAdmin = function(req, res, next) {
    if(req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(401);
    }
}