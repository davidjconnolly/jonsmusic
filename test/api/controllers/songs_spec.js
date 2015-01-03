'use strict';

describe('Songs Controller', function () {
  var Song = require('../../../api/models/song');
  var Album = require('../../../api/models/album');
  var song;
  var now = new Date(Date()).toISOString();

  before(function(done) {
    resetDB(done);
  });

  before(function(done) {
    loginUser(done);
  });

  beforeEach(function (done) {
    Song.create({
      title : "foo title",
      lyrics : "foo lyrics",
      date : now
    }).then(function (s) {
      song = s;
      done();
    });
  });

  describe('Basic Methods', function () {
    it('should get a list of songs', function (done) {
      agent
        .get('/api/admin/songs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          var songs = res.body;
          assert.equal(songs.length, 1);
          assert.equal(songs[0]._id, song.id);
          assert.equal(songs[0].title, song.title);
          assert.equal(songs[0].lyrics, song.lyrics);
          assert.equal(songs[0].date, now);
          done();
        });
    });

    it('should show one song', function (done) {
      agent
        .get('/api/admin/songs/' + song.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          assert.equal(res.body._id, song.id);
          assert.equal(res.body.title, song.title);
          assert.equal(res.body.lyrics, song.lyrics);
          assert.equal(res.body.date, now);
          done();
        });
    });

    it('should create a song', function (done) {
      agent
        .post('/api/admin/songs')
        .send({
          title : "foo title 2",
          lyrics : "foo lyrics 2",
          date : now
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          assert.isDefined(res.body._id);
          assert.equal(res.body.title, "foo title 2");
          assert.equal(res.body.lyrics, "foo lyrics 2");
          assert.equal(res.body.date, now);
          done();
        });
    });

    it('should update a song', function (done) {
      agent
        .put('/api/admin/songs/' + song.id)
        .send({
          title : "foo title 3",
          lyrics : "foo lyrics 3",
          date : now
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          assert.equal(res.body._id, song.id);
          assert.equal(res.body.title, "foo title 3");
          assert.equal(res.body.lyrics, "foo lyrics 3");
          assert.equal(res.body.date, now);
          done();
        });
    });

    it('should destroy a song', function (done) {
      agent
        .delete('/api/admin/songs/' + song.id)
        .expect(200)
        .expect('OK')
        .end(done);
    });


    describe('Search Songs', function () {
      var searchSong = null;

      before(function (done) {
        Song.create({
          title : "foo search title",
          lyrics : "foo lyrics",
          date : now
        }).then(function (s) {
          searchSong = s;
          done();
        });
      });

      it('should query a list of songs', function (done) {
        agent
          .get('/api/admin/songs?title=search')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            var songs = res.body;
            assert.equal(songs.length, 1);
            assert.equal(songs[0]._id, searchSong.id);
            assert.equal(songs[0].title, searchSong.title);
            assert.equal(songs[0].lyrics, searchSong.lyrics);
            assert.equal(songs[0].date, now);
            done();
          });
      });
    });

  });

  describe('Album association', function (){
    var album;

    before(function (done) {
      Album.create({
        title : "foo title",
        description : "foo description",
        date : now
      }).then(function (a) {
        album = a;
        done();
      });
    });

    it('should not be able to delete a song with associated albums', function (done) {
      agent
        .put('/api/admin/albums/' + album.id)
        .send({
          songs : [ song ]
        })
        .end(function (err, res) {
          if (err) {
            done(err);
          }

          agent
            .delete('/api/admin/songs/' + song.id)
            .expect(500)
            .expect('Cannot delete songs with associated albums.')
            .end(done);
        });
    });
  });

});
