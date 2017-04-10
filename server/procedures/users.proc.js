var db = require('../config/db');

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}
exports.all = function() {
    return db.rows("GetAllUsers", []);
}
exports.read = function(id) {
	return db.row('GetUser', [id]);
}

exports.destroy=function(id) {
    return db.empty('DeleteUser', [id]);
}

exports.post = function(u, hash) {
    return db.empty('CreateUser', [u.firstname, u.lastname, u.email, u.role, hash]);
}

exports.update=function(p) {
    return db.empty("UpdateUSer", [p.firstname, p.lastname, p.email, p.role, p.password, p.id]);
}
