'use strict';

var Album = require('../models/album.js');

exports.index = function(req, res) {
  Album.find(function (err, albums) {
    if(err) { return handleError(res, err); }
    return res.json(200, albums);
  });
};

exports.show = function(req, res) {
  Album.findById(req.params.id, function (err, album) {
    if(err) { return handleError(res, err); }
    if(!album) { return res.send(404); }
    return res.json(album);
  });
};

exports.create = function(req, res) {
  Album.create(req.body, function(err, album) {
    if(err) { return handleError(res, err); }
    return res.json(201, album);
  });
};

exports.update = function(req, res) {
  Album.findById(req.params.id, function (err, album) {
    if (err) { return handleError(res, err); }
    if(!album) { return res.send(404); }
    album.title = req.body.title;
    album.date = req.body.date || null;
    album.description = req.body.description || null;
    album.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, album);
    });
  });
};

exports.destroy = function(req, res) {
  Album.findById(req.params.id, function (err, album) {
    if(err) { return handleError(res, err); }
    if(!album) { return res.send(404); }
    album.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(200);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
