'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  title : String,
  description : String,
  date : Date,
  published: Boolean
});

module.exports = mongoose.model('Album', AlbumSchema);
