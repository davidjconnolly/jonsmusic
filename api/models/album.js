'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  title : { type: String, required: true },
  description : String,
  date : Date,
  published : { type: Boolean, default: false },
  songs : [ {type : mongoose.Schema.ObjectId, ref: 'Song'} ]
});

module.exports = mongoose.model('Album', AlbumSchema);
