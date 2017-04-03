// var express = require('express');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');
var cookieParser = require('cookie-parser');
var configurePassPort = require('./config/passport');
var routeMw= require('./middleware/routing.mw');
// var mysql = require('mysql');

// var pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'rachelblog',
//     password: 'Blog',
//     database: 'AngularBlog'
// });

var app = express();

var clientPath = path.join(__dirname, "../client");

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());

configurePassPort(app);
app.use('/api', api);

app.get("*", function(req, res, next) {
    if(routeMw.isAsset(req.url)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    }
})

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

// app.get('/api/posts', function (req, res) {
//     getAllPosts(req.body).then(function (data) {
//         res.send(data[0]);
//         // console.log(data[0]);
//     }, function (err) {
//         console.log(err);
//         res.sendStatus(500).end();
//     })
// })

// app.post('/api/posts',  function (req, res){
//     postBlog(req.body.userid, req.body.categoryid, req.body.content, req.body.title).then(function (data) {
//         res.send(data[0][0]);
//         res.status(201).end();
//     }, function (err) {
//         console.log(err);
//         res.sendStatus(500);
//     })
// })

// app.get('/api/posts/:id', function (req, res) {
//     getSinglePost(req.params.id).then(function (data) {
        
//         res.send(data[0][0]);
        
//     }, function (err) {
//         console.log(err);
//         // res.sendStatus(500);
//     })
// })

//     app.put('/api/posts/:id', function (req, res) {
//     updatePost(req.body.title, req.body.content, req.body.categoryid, req.params.id).then(function (data) {
//         res.sendStatus(204).end();
//     }, function (err) {
//         console.log(err);
//         // res.sendStatus(500);
//     })
// })

// app.delete('/api/posts/:id', function (req, res) {
//     deletePost(req.params.id).then(function (data) {
//         res.sendStatus(204).end();
//     }, function (err) {
//         console.log(err);
//         // res.sendStatus(500);
//     })
// })

// app.get('/api/users', function (req, res) {
//     getAllUsers().then(function (data) {
//         res.send(data[0]);
//     }, function (err) {
//         console.log(err);
//     })
// })

// app.get('/api/categories', function (req, res) {
//     getAllCategories().then(function (data) {
//         res.send(data[0]);
//     }, function (err) {
//         console.log(err);
//     })
// })

// function isAsset(path) {
//    var pieces = path.split('/');
//    //IF OUR ARRAY IS EMPTY THEN ITS NOT AN ASSET
//    if (pieces.length === 0) {
//        return false;
//    }
//    //GET THE LAST ITEM IN OUR ARRAW OF STRINGS
//    var last = pieces[pieces.length - 1];
//    //IF THE PATH CONTAINS '/API' OR '/?' THEN ITS AN ASSET
//    if (path.indexOf("/api") !== -1 || path.indexOf("/?") !== -1) {
//        return true;
//        //IF THE LAST ITEM IN OUR ARRAY CONTA A '.' THEN ITS AN ASSET
//    } else if (last.indexOf('.') !== -1) {
//        return true;
//        //OTHERWISE...ITS NOT AN ASSET
//    } else {
//        return false;
//    }
// }

// app.get("*", function(req, res, next){
//    if(isAsset(req.url)){
//        return next();
//    }else{
//        res.sendFile(path.join(clientPath, "index.html"))
//    }
// });

app.listen(3000);
console.log('server listening on port 3000');