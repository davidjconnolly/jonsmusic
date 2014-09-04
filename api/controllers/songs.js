'use strict';

var Song = require('./song.model');

// Get list of albums
exports.index = function(req, res) {
  Song.find(function (err, albums) {
    if(err) { return handleError(res, err); }
    return res.json(200, albums);
  });
};
