'use strict'

module.exports = function(app){
  app.use('/api/albums', require('./routes/albums'));
  app.use('/api/songs', require('./routes/songs'));
}
