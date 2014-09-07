'use strict'

require('./config/local.env.js');
require('./config/passport.js');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express    = require('express');
var passport   = require('passport');
var session    = require('express-session');
var flash      = require('connect-flash');
var bodyParser = require('body-parser');
var path       = require('path');
var mongoose   = require('mongoose');
var app        = express();

// Connect to database
mongoose.connect(process.env.DATABASE_URI, {});

// Set up resources
app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')))
app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')))
app.use('/fonts', express.static(path.join(__dirname, '..', 'public', 'fonts')))
app.use('/views', express.static(path.join(__dirname, '..', 'public', 'views')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Authentication
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app, passport);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
