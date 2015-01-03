'use strict';

var Song = require('../models/song.js');

exports.index = function(req, res) {
  var query = {};
  if (req.query && req.query.title) {
    query.title = new RegExp(req.query.title, 'i');
  }

  Song.find(query, function (err, songs) {
    if(err) { return handleError(res, err); }
    return res.json(200, songs);
  });
};

exports.show = function(req, res) {
  Song.findById(req.params.id).populate('albums').exec(function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    return res.json(song);
  });
};

exports.create = function(req, res) {
  Song.create(req.body, function(err, song) {
    if(err) { return handleError(res, err); }
    return res.json(201, song);
  });
};

exports.update = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if (err) { return handleError(res, err); }
    if(!song) { return res.send(404); }

    if (req.body.title !== undefined) song.title = req.body.title;
    if (req.body.date !== undefined) song.date = req.body.date || null;
    if (req.body.lyrics !== undefined) song.lyrics = req.body.lyrics || null;
    if (req.body.file !== undefined) song.file = req.body.file || {};

    song.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, song);
    });
  });
};

exports.destroy = function(req, res) {
  Song.findById(req.params.id).populate('albums').exec(function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    if(song.albums.length > 0){
      return res.send(500, "Cannot delete songs with associated albums.");
    }
    song.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(200);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
