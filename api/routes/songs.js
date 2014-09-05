'use strict';

var Song = require('../models/song');

module.exports = function(app) {app.get('/songs', function (req, res) {
    Song.find(function (err, albums) {
      if(err) { return handleError(res, err); }
      return res.json(200, albums);
    });
  });
}