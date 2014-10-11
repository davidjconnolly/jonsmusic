'use strict';

var Album = require('../../../api/models/album');
var album;
var now = new Date(Date()).toISOString();

describe('Albums Controller', function () {
  before(function(done) {
    resetDB(done);
  });

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

  before(function(done) {
    loginUser(done);
  });

  it('should get a list of albums', function (done) {
    agent
      .get('/api/albums')
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
      .get('/api/albums/' + album.id)
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

  it('should create a album', function (done) {
    agent
      .post('/api/albums')
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
        done();
      });
  });

  it('should update a album', function (done) {
    agent
      .put('/api/albums/' + album.id)
      .send({
        title : "foo title 3",
        description : "foo description 3",
        date : now
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        assert.equal(res.body._id, album.id);
        assert.equal(res.body.title, "foo title 3");
        assert.equal(res.body.description, "foo description 3");
        assert.equal(res.body.date, now);
        done();
      });
  });

  it('should destroy a album', function (done) {
    agent
      .delete('/api/albums/' + album.id)
      .expect(200)
      .expect('OK')
      .end(done);
  });

});
