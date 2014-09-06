'use strict';

var Song = require('../models/song.js');

exports.index = function(req, res) {
  Song.find({}, function (err, songs) {
    if(err) { return handleError(res, err); }
    return res.json(200, songs);
  });
};

exports.show = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
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
  if(req.body._id) { delete req.body._id; }
  Song.findById(req.params.id, function (err, song) {
    if (err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    var updated = _.merge(song, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, song);
    });
  });
};

exports.destroy = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    song.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
