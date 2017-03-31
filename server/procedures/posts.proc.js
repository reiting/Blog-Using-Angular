var db = require('../config/db');

exports.all = function() {
    return db.rows("GetAllPosts");
}

exports.post = function(userid, categoryid, content, title) {
    return db.empty("PostBlog(?, ?, ?, ?)", [userid, categoryid, content, title]);
}

exports.read = function(id) {
    return db.row("GetSinglePost(?)", [id]);
}

exports.update=function(title, content, categoryid, id) {
    return db.empty("UpdatePost(?, ?, ?, ?)", [title, content, categoryid, id]);
}

exports.destroy=function(id) {
    return db.empty('DeletePost(?)', [id]);
}