'use strict'

require('./config/local.env.js');

var express = require('express');
var mongoose = require('mongoose');
var app = express();
require('./routes.js')(app);

// Connect to database
mongoose.connect(process.env.DATABASE_URI, {});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
