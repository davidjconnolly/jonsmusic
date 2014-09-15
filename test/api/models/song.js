'use strict';

var Song = require('../../../api/models/song');

describe('Song', function() {
  var song;
  var now = Date();

  before(function (done) {
    Song.create({
      title : "foo title",
      lyrics : "foo lyrics",
      date : now
    }).then(function (a) {
      song = a;
      done();
    });
  });

  it("sets all fields properly", function(){
    assert.equal('foo title', song.title);
    assert.equal('foo lyrics', song.lyrics);
    assert.equal(now, song.date);
  });

});
