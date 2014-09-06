'use strict'

var users = require('./controllers/users');

module.exports = function(app){
  // User Routes

  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('./controllers/session');
  app.get('/auth/session', ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // App Routes
  app.use('/api/albums', require('./routes/albums'));
  app.use('/api/songs', require('./routes/songs'));
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401);
}
