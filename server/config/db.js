var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'rachelblog',
    password: 'Blog',
    database: 'AngularBlog'
});

exports.pool = pool;

exports.empty = function(procedure, values) {
    return sendQuery(procedure, values).then(function() {
        return;
    })
}
//call mysql query that returns one row
exports.row = function(procedure, values) {
    return sendQuery(procedure, values).then(function(resultsets) {
        return resultsets[0][0];
    })
}
//call mysql query that returns many rows
exports.rows = function(procedure, values) {
    return sendQuery(procedure, values).then(function(resultsets) {
        return resultsets[0];
    })
}

function sendQuery(procedure, values) {
    console.log(values);
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                var queryString = "CALL " + procedure + parseParams(values.length);
                connection.query(queryString, values, function (err, resultSets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultSets);
                    }
                })
            }
        })
    })
}

//CALL SomeProcedure -- > (?, ?, ?, ?) - If there's 4 parameters
function parseParams(amount) {
    var output = "";
    for (var i = 1; i <= amount; i++) {
        output += (i == amount ? "?" : "?, ");
    }
    return "(" + output + ")"
}

// function getAllPosts() {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL GetAllPosts()', function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }

// function postBlog(userid, categoryid, content, title) {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL PostBlog(?, ?, ?, ?)', [userid, categoryid, content, title], function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }

// function getSinglePost(id) {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL GetSinglePost(?)',[id], function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }

// function updatePost(title, content, categoryid, id) {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL UpdatePost(?, ?, ?, ?)', [title, content, categoryid, id], function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }

// function deletePost(id) {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL DeletePost(?)', [id], function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }

// function getAllUsers() {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL GetAllUsers()', function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }

// function getAllCategories() {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL GetAllCategories()', function (err, resultsets) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(resultsets);
//                     }
//                 })
//             }
//         })
//     })
// }


