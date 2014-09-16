'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./config/local.env.js');
require('./config/passport.js');

var express    = require('express');
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var path       = require('path');
var mongoose   = require('mongoose');
var app        = express();
var favicon    = require('serve-favicon');

// Connect to database
app.connection = mongoose.connect(process.env.DATABASE_URI, {});

// Set up resources
app.use('/js', express.static(path.join(__dirname, '..', 'tmp', 'js')));
app.use('/css', express.static(path.join(__dirname, '..', 'tmp', 'css')));
app.use('/fonts', express.static(path.join(__dirname, '..', 'tmp', 'fonts')));
app.use('/views', express.static(path.join(__dirname, '..', 'tmp', 'views')));
app.use(favicon(path.join(__dirname, '..', 'tmp', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Authentication
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
require('./routes.js')(app, passport);

// Start App
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;
