var db = require('../config/db');

exports.all = function() {
    return db.rows("GetAllPosts", []);
}

exports.post = function(p) {
    return db.empty("PostBlog", [p.userid, p.categoryid, p.content, p.title]);
}

exports.read = function(id) {
    return db.row("GetSinglePost", [id]);
}

exports.update=function(p) {
    return db.empty("UpdatePost", [p.title, p.content, p.categoryid, p.id]);
}

exports.destroy=function(id) {
    return db.empty('DeletePost', [id]);
}