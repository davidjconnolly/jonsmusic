'use strict';

module.exports = function(app, ensureAuthenticated){
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);
  app.get('/auth/check_username/:username', users.exists);

  var session = require('../controllers/session');
  app.get('/auth/session', ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);
}
