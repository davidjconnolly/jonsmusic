'use strict';

var album_controller = require('../controllers/albums')

module.exports = function(app){
  app.get('/albums', album_controller.index)
}
