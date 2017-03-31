var express = require('express');
var procedures = require('../procedures/posts.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

router.route('/')
    .get(function (req, res) {
         procedures.all()
            .then(function (success) {
                res.send(success);
            }, function (err) {
                res.status(500).send(err);
            });
    })

    .post(function (req, res) {
         procedures.post(req.body.userid, req.body.categoryid, req.body.content, req.body.title)
            .then(function (success) {
                res.send(success);
            }, function (err) {
                res.status(500).send(err);
            });
    })

    

router.route('/:id')

    .get(function (req, res) {
         procedures.read(req.params.id)
            .then(function (success) {
                res.send(success);
            }, function (err) {
                res.status(500).send(err);
            });
    })

    .put(function (req, res) {
         procedures.update(req.body.title, req.body.content, req.body.categoryid, req.params.id)
            .then(function (success) {
                res.send(success);
            }, function (err) {
                res.status(500).send(err);
            });
    })

    .delete(function (req, res) {
         procedures.destroy(req.params.id)
            .then(function (success) {
                res.send(success);
            }, function (err) {
                res.status(500).send(err);
            });
    })


module.exports = router;