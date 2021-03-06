'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  title : { type: String, required: true },
  date : Date,
  lyrics : String,
  file : { fileUrl: String, fileType: String, fileName: String },
  albums : [ {type: mongoose.Schema.ObjectId, ref: 'Album'} ]
});

module.exports = mongoose.model('Song', SongSchema);
