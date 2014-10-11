'use strict';

var SongScheme = require('../models/song.js');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  title : String,
  description : String,
  date : Date,
  published: Boolean,
  songs : [ SongScheme ]
});

module.exports = mongoose.model('Album', AlbumSchema);
