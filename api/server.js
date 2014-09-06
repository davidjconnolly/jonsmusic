'use strict'

require('./config/local.env.js');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

// Connect to database
mongoose.connect(process.env.DATABASE_URI, {});

app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')))
app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')))
app.use('/fonts', express.static(path.join(__dirname, '..', 'public', 'fonts')))
app.use('/views', express.static(path.join(__dirname, '..', 'public', 'views')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes.js')(app);

app.all('*', function (req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendfile('app/views/index.html');
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
