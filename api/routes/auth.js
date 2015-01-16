'use strict';

module.exports = function(app, ensureAuthenticated){
  var users = require('../controllers/users');
  var session = require('../controllers/session');
  app.get('/auth/session', ensureAuthenticated, session.session);
  app.get('/auth/users/:id', ensureAuthenticated, users.show);
  app.get('/auth/check_username/:username', ensureAuthenticated, users.exists);
  app.post('/auth/users', ensureAuthenticated, users.create);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);
};
