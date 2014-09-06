'use strict'

require('./config/local.env.js');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
  path = require('path');
var mongoose = require('mongoose');
var app = express();
require('./routes.js')(app);

// Connect to database
mongoose.connect(process.env.DATABASE_URI, {});

app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')))
app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')))
app.use('/fonts', express.static(path.join(__dirname, '..', 'public', 'fonts')))
app.use('/views', express.static(path.join(__dirname, '..', 'public', 'views')))
// app.use('/assets', express.static(config.assetPath))

app.route('/*')
  .get(function(req, res) {
    res.sendfile('app/public/index.html');
  });

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
