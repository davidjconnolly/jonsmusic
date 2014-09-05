'use strict'

module.exports = function(app){
  app.get('/', function(req, res){
    res.send('Hello World');
  });

  require('./routes/albums')(app)
  require('./routes/songs')(app)
}
