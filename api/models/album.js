'use strict';

var SongSchema = require('./song.js');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  title : String,
  description : String,
  date : Date,
  published: Boolean,
  songs : [ SongSchema ]
});

module.exports = mongoose.model('Album', AlbumSchema);
