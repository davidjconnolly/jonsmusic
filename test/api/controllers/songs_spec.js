'use strict';

var Song = require('../../../api/models/song');
var song;
var now = new Date(Date()).toISOString();

describe('Songs Controller', function () {
  before(function(done) {
    resetDB(done);
  });

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

  before(function(done) {
    loginUser(done);
  });

  it('should get a list of songs', function (done) {
    agent
      .get('/api/songs')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([{
        "_id": song.id,
        "title": "foo title",
        "lyrics": "foo lyrics",
        "date": now,
        "__v": 0
      }])
      .end(done);
  });

  it('should show one song', function (done) {
    agent
      .get('/api/songs/' + song.id)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        "_id": song.id,
        "title": "foo title",
        "lyrics": "foo lyrics",
        "date": now,
        "__v": 0
      })
      .end(done);
  });

  it('should create a song', function (done) {
    agent
      .post('/api/songs')
      .send({
        title : "foo title 2",
        lyrics : "foo lyrics 2",
        date : now
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(/"title":"foo title 2"/)
      .expect(/"lyrics":"foo lyrics 2"/)
      .expect(new RegExp("\"date\":\"" + now + "\""))
      .expect(/"_id":/)
      .end(done);
  });

  it('should update a song', function (done) {
    agent
      .put('/api/songs/' + song.id)
      .send({
        title : "foo title 3",
        lyrics : "foo lyrics 3",
        date : now
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        "_id": song.id,
        "title": "foo title 3",
        "lyrics": "foo lyrics 3",
        "date": now,
        "__v": 0
      })
      .end(done);
  });

  it('should destroy a song', function (done) {
    agent
      .delete('/api/songs/' + song.id)
      .expect(200)
      .expect('OK')
      .end(done);
  });

});
