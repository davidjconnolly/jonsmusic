'use strict';

var router = require('express').Router();

module.exports = function(ensureAuthenticated){
  var songs = require('../controllers/songs');
  router.get('/admin/songs', ensureAuthenticated, songs.index);
  router.get('/admin/songs/:id', ensureAuthenticated, songs.show);
  router.post('/admin/songs', ensureAuthenticated, songs.create);
  router.put('/admin/songs/:id', ensureAuthenticated, songs.update);
  router.delete('/admin/songs/:id', ensureAuthenticated, songs.destroy);

  var albums = require('../controllers/albums');
  router.get('/admin/albums', ensureAuthenticated, albums.index);
  router.get('/admin/albums/:id', ensureAuthenticated, albums.show);
  router.post('/admin/albums', ensureAuthenticated, albums.create);
  router.put('/admin/albums/:id', ensureAuthenticated, albums.update);
  router.delete('/admin/albums/:id', ensureAuthenticated, albums.destroy);

  var aws = require('../controllers/aws');
  router.get('/admin/s3Policy', ensureAuthenticated, aws.getS3Policy);

  router.get('/albums', albums.publicIndex);
  router.get('/albums/:id', albums.publicShow);

  return router;
};
