var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session)
var LocalStrategy = require('passport-local').Strategy;
var userProc = ('../procedures/users.proc');
var postProc = ('../procedures/posts.proc');
var catProc = ('../procedures/categories.proc');
var pool = require('../config/db').pool;

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        userProc.readByEmail(email).then(function(user) {
            if(!user) {
                return done(null, false);
            } if (user.password !==passwword) {
                return done(null, false, {message: "Nope!"});
            }
                return done(null, user);
        }, function(err) {
            return done(err);
        })
    }));
    //set up how to handle user serializeation
    passport.serializeUser(function(user,done) {
        done(null, user.id);
    })
    //set up how to handle user deserialization
    passport.deserializeUser(function(id,done) {
        userProc.read(id).then(function(user) {
            done(null, user);
        }, function(err) {
            done(err);
        })
    })
    //configure our database to create a sessions table and start storing user sessions there
    var sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);
    //configure our sessions to have these properties
    app.use(session({
        secret:'randomly-generated string!',
        store: sessionStore,
        resave: false,
        //stops saving users to database if they haven't fully logged in
        saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());
}
module.exports = configurePassport;