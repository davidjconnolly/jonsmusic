'use strict';

var AlbumSchema = require('./album.js');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  title : String,
  date : Date,
  lyrics : String,
  albums : [ AlbumSchema ]
});

module.exports = mongoose.model('Song', SongSchema);
