'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!process.env.NODE_ENV == 'production'){
  require('./config/local.env.js');
}

require('./config/passport.js');

var express    = require('express');
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var path       = require('path');
var mongoose   = require('mongoose');
var app        = express();
var favicon    = require('serve-favicon');
var port       = process.env.PORT || 3000

// Connect to database
app.connection = mongoose.connect(process.env.DATABASE_URI, {});

// Set up resources
app.use('/js', express.static(path.join(__dirname, '..', 'deploy/public', 'js')));
app.use('/css', express.static(path.join(__dirname, '..', 'deploy/public', 'css')));
app.use('/fonts', express.static(path.join(__dirname, '..', 'deploy/public', 'fonts')));
app.use('/views', express.static(path.join(__dirname, '..', 'deploy/public', 'views')));
app.use(favicon(path.join(__dirname, '..', 'deploy/public', 'favicon.ico')));
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
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;
