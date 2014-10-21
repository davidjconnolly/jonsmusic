'use strict';

describe('Albums Controller', function () {
  var Album = require('../../../api/models/album');
  var Song = require('../../../api/models/song');
  var album;
  var song;
  var now = new Date(Date()).toISOString();

  before(function(done) {
    resetDB(done);
  });

  before(function(done) {
    loginUser(done);
  });

  beforeEach(function (done) {
    Album.create({
      title : "foo title",
      description : "foo description",
      date : now,
      published : false
    }).then(function (a) {
      album = a;
      done();
    });
  });

  describe('Basic Methods', function () {
    it('should get a list of albums', function (done) {
      agent
        .get('/api/admin/albums')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          var albums = res.body;
          assert.equal(albums.length, 1);
          assert.equal(albums[0]._id, album.id);
          assert.equal(albums[0].title, album.title);
          assert.equal(albums[0].description, album.description);
          assert.equal(albums[0].date, now);
          done();
        });
    });

    it('should show one album', function (done) {
      agent
        .get('/api/admin/albums/' + album.id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          assert.equal(res.body._id, album.id);
          assert.equal(res.body.title, album.title);
          assert.equal(res.body.description, album.description);
          assert.equal(res.body.date, now);
          done();
        });
    });

    it('should create an album', function (done) {
      agent
        .post('/api/admin/albums')
        .send({
          title : "foo title 2",
          description : "foo description 2",
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
          assert.equal(res.body.description, "foo description 2");
          assert.equal(res.body.date, now);
          assert.equal(res.body.published, false);
          done();
        });
    });

    it('should destroy an album', function (done) {
      agent
        .delete('/api/admin/albums/' + album.id)
        .expect(200)
        .expect('OK')
        .end(done);
    });

  });

  describe('Song association', function (){
    var song;

    before(function (done) {
      Song.create({
        title : "foo title",
        lyrics : "foo lyrics",
        date : now,
        published : false
      }).then(function (s) {
        song = s;
        done();
      });
    });

    it('should update and show an album with songs', function (done) {
      agent
        .put('/api/admin/albums/' + album.id)
        .send({
          title : "foo title updated",
          songs : [ song ],
          published : true
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          assert.equal(res.body._id, album.id);
          assert.equal(res.body.title, "foo title updated");
          assert.equal(res.body.description, album.description);
          assert.equal(res.body.date, now);
          assert.equal(res.body.published, true);
          assert.equal(res.body.songs.length, 1);
          assert.equal(res.body.songs[0]._id, song.id);
          assert.equal(res.body.songs[0].title, song.title);
          assert.equal(res.body.songs[0].lyrics, song.lyrics);
          assert.equal(res.body.songs[0].date, now);

          agent
          .get('/api/admin/albums/' + album.id)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) {
              done(err);
            }
            assert.equal(res.body._id, album.id);
            assert.equal(res.body.title, "foo title updated");
            assert.equal(res.body.description, album.description);
            assert.equal(res.body.date, now);
            assert.equal(res.body.published, true);
            assert.equal(res.body.songs.length, 1);
            assert.equal(res.body.songs[0]._id, song._id);
            assert.equal(res.body.songs[0].title, song.title);
            assert.equal(res.body.songs[0].description, song.description);
            assert.equal(res.body.songs[0].date, now);
            done();
          });

        });

    });

  });

});