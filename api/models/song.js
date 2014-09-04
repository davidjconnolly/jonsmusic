'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  title : String,
  date : Date,
  lyrics : String
});

module.exports = mongoose.model('Song', SongSchema);
