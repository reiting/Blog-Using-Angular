var express = require('express');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var passport = require('passport');

var router = express.Router();

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err); 
            return res.sendStatus(500);
            console.log("error message");
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function(err) {
            if(err) { return res.sendStatus(500); 
                console.log("this is bad");
        }
            else { return res.send(user); }
        });
    })(req, res, next);
})

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

router.get('*', auth.isLoggedIn);

router.route('/', auth.isLoggedIn, function (req, res) {
         procedures.all()
        .then(function(users) {
            res.send(users);
        }, function (err) {
            res.status(500).send(err);
            console.log("this one is wrong!");
        });
    })


// app.get('/', function (req, res) {
//     getAllUsers().then(function (data) {
//         res.send(data[0]);
//     }, function (err) {
//         console.log(err);
//     })
// })

module.exports = router;