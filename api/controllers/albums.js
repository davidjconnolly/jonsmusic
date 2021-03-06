'use strict';

var Album = require('../models/album.js');
var Song = require('../models/song.js');

exports.index = function(req, res) {
  Album.find(function (err, albums) {
    if(err) { return handleError(res, err); }
    return res.json(200, albums);
  });
};

exports.publicIndex = function(req, res) {
  Album.find( {"published": true}, function (err, albums) {
    if(err) { return handleError(res, err); }
    return res.json(200, albums);
  });
};


exports.show = function(req, res) {
  Album.findById(req.params.id).populate('songs').exec(function (err, album) {
    if(err) { return handleError(res, err); }
    if(!album) { return res.send(404); }
    return res.json(album);
  });
};

exports.publicShow = function(req, res) {
  Album.findById(req.params.id).populate('songs').exec(function (err, album) {
    if(err) { return handleError(res, err); }
    if(!album) { return res.send(404); }
    if(album.published !== true) { return res.send(401); }
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
  Album.findById(req.params.id).exec(function (err, album) {
    if (err) { return handleError(res, err); }
    if(!album) { return res.send(404); }

    if (req.body.title !== undefined) album.title = req.body.title;
    if (req.body.date !== undefined) album.date = req.body.date || null;
    if (req.body.description !== undefined) album.description = req.body.description || null;
    if (req.body.published !== undefined) album.published = req.body.published || false;

    if (req.body.songs !== undefined){
      var songIds = _.map(album.songs, function(item){ return item.toString() || null; });
      var newSongIds = _.map(_.pluck(req.body.songs, '_id'), function(item) { return item.toString() || null; });

      var deletedSongIds = _.difference(songIds, newSongIds);
      var addedSongIds = _.difference(newSongIds, songIds);

      _.each(addedSongIds, function(songId){
        Song.findById(songId).populate('albums').exec(function (err, song) {
          song.albums = _.union(_.pluck(song.albums, 'id'), [ album.id ]);
          song.save();
        });
      });

      _.each(deletedSongIds, function(songId){
        Song.findById(songId).populate('albums').exec(function (err, song) {
          song.albums = _.without(_.pluck(song.albums, 'id'), album.id );
          song.save();
        });
      });

      album.songs = newSongIds || [];
    }

    album.save(function (err) {
      if (err) { return handleError(res, err); }
      album.populate('songs', function (err, album){
        return res.json(200, album);
      });
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
