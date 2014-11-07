'use strict';

var Song = require('../../../api/models/song');
var song;
var now = Date();

describe('Song Model', function() {
  before(function(done) {
    resetDB(done);
  });

  before(function (done) {
    Song.create({
      title : "foo title",
      lyrics : "foo lyrics",
      date : now,
      file : {
        fileUrl: "foo url",
        fileType: "audio/mp3",
        fileName: "foo filename"
      }
    }).then(function (a) {
      song = a;
      done();
    });
  });

  it("sets all fields", function(){
    assert.equal('foo title', song.title);
    assert.equal('foo lyrics', song.lyrics);
    assert.equal(now, song.date);
    assert.equal("foo url", song.file.fileUrl);
    assert.equal("foo url", song.file.fileUrl);
    assert.equal("audio/mp3", song.file.fileType);
    assert.equal("foo filename", song.file.fileName);
  });

});
