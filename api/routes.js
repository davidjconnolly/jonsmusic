'use strict';

module.exports = function(app){
  require('./routes/auth')(app, ensureAuthenticated);
  app.use('/api', require('./routes/api')(ensureAuthenticated));
  app.all('*', function (req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }
    res.sendfile('app/public/index.html');
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401);
}
