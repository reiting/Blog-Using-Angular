var express = require('express');
var procedures = require('../procedures/categories.proc');

var router = express.Router();

router.get('/', function (req, res) {
    procedures.all()
        .then(function (categories) {
            res.send(categories);
        }, function (err) {
            res.status(500).send(err);
        })
});

module.exports = router;