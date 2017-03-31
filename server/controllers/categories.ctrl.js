var express = require('express');
var procedures = require('../procedures/categories.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

router.get('/', function(req, res) {
         procedures.all()
        .then(function(categories) {
            res.send(categories);
        }, function (err) {
            res.status(500).send(err);
        })
    });


// app.get('/', function (req, res) {
//     getAllCategories().then(function (data) {
//         res.send(data[0]);
//     }, function (err) {
//         console.log(err);
//     })
// })

module.exports = router;