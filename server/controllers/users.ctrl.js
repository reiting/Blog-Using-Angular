var express = require('express');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/routing.mw');
var passport = require('passport');
var utils = require('../config/utils');
var sg = require('../services/email.svc');
var router = express.Router();


router.get('/generateHash/:pw', function(req, res) {
    utils.encryptPassword(req.params.pw)
    .then(function(hash) {
        res.send(hash);
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})


router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(500);
            }
            else { return res.send(user); }
        });
    })(req, res, next);
})


router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.all('*', auth.isLoggedIn);

//get all users
router.get('/', function (req, res) {
    procedures.all()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            res.status(500).send(err);
        });
})

//create a new user
router.post('/', auth.isLoggedIn, auth.isAdmin, function (req, res) {
    var u = req.body;
    utils.encryptPassword(u.password).then(function (hash) {
        procedures.post(u, hash).then(function (id) {
            res.send(id);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        })
    });
});

router.get('/me', function (req, res) {
    res.send(req.user);
});

//get a single user
router.get('/:id', auth.isLoggedIn, auth.isAdmin, function (req, res) {
    procedures.read(req.params.id)
        .then(function (success) {
            res.send(success);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
})
//delete a single user
router.delete('/:id', auth.isLoggedIn, auth.isAdmin, function (req, res) {
    procedures.destroy(req.params.id)
        .then(function (success) {
            res.sendStatus(201);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
})
//update a single user
router.put('/:id', auth.isLoggedIn, auth.isAdmin, function (req, res) {
    procedures.update(req.body)
        .then(function (success) {
            res.sendStatus(204);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
})

module.exports = router;