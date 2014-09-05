'use strict';

var Album = require('../models/album.js');

// Get list of albums
exports.index = function(req, res) {
  Album.find(function (err, albums) {
    if(err) { return handleError(res, err); }
    return res.json(200, albums);
  });
};
