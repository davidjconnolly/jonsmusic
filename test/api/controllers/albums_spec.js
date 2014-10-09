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
      .expect([{
        "_id": album.id,
        "title": "foo title",
        "description": "foo description",
        "date": now,
        "__v": 0
      }])
      .end(done);
  });

  it('should show one album', function (done) {
    agent
      .get('/api/albums/' + album.id)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        "_id": album.id,
        "title": "foo title",
        "description": "foo description",
        "date": now,
        "__v": 0
      })
      .end(done);
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
      .expect(/"title":"foo title 2"/)
      .expect(/"description":"foo description 2"/)
      .expect(new RegExp("\"date\":\"" + now + "\""))
      .expect(/"_id":/)
      .end(done);
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
      .expect({
        "_id": album.id,
        "title": "foo title 3",
        "description": "foo description 3",
        "date": now,
        "__v": 0
      })
      .end(done);
  });

  it('should destroy a album', function (done) {
    agent
      .delete('/api/albums/' + album.id)
      .expect(204)
      .expect('')
      .end(done);
  });

});
