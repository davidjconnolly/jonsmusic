'use strict';

// var express = require('express');
// var router = express.Router()
var controller = require('../controllers/albums')

module.exports = function(app){
  app.get('/albums/', controller.index);
  app.get('/albums/:id', controller.show);
  app.post('/albums/', controller.create);
  app.put('/albums/:id', controller.update);
  app.patch('/albums/:id', controller.update);
  app.delete('/albums/:id', controller.destroy);
// module.exports = router
}