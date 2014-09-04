require('./config/local.env.js');
var express = require('express');
var mongoose = require('mongoose');
var app = express();

console.log(process.env.DATABASE_URI)
// Connect to database
mongoose.connect(process.env.DATABASE_URI, {});

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
