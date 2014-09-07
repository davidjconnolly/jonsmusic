'use strict';

var router = require('express').Router();

module.exports = function(ensureAuthenticated){
  var songs = require('../controllers/songs');
  router.get('/songs', ensureAuthenticated, songs.index);
  router.get('/songs/:id', ensureAuthenticated, songs.show);
  router.post('/songs', ensureAuthenticated, songs.create);
  router.put('/songs/:id', ensureAuthenticated, songs.update);
  router.patch('/songs/:id', ensureAuthenticated, songs.update);
  router.delete('/songs/:id', ensureAuthenticated, songs.destroy);

  var albums = require('../controllers/albums');
  router.get('/albums', ensureAuthenticated, albums.index);
  router.get('/albums/:id', ensureAuthenticated, albums.show);
  router.post('/albums', ensureAuthenticated, albums.create);
  router.put('/albums/:id', ensureAuthenticated, albums.update);
  router.patch('/albums/:id', ensureAuthenticated, albums.update);
  router.delete('/albums/:id', ensureAuthenticated, albums.destroy);

  return router;
};
