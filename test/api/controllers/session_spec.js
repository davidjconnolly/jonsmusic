'use strict';

describe('Session Controller', function () {
  beforeEach(function(done) {
    resetDB(done);
  });

  describe('logged out actions', function () {
    it('should login', function (done) {
      agent
        .post('/auth/session')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          "_id": session_user.id,
          "email": "test@test.com",
          "username": "Foo User"
        })
        .end(done);
    });

    it('should fail on invalid email', function (done) {
      agent
        .post('/auth/session')
        .send({
          email: 'bad_email@test.com',
          password: 'password'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({"errors":{"email":{"type":"Email is not registered."}}})
        .end(done);
    });

    it('should fail on invalid password', function (done) {
      agent
        .post('/auth/session')
        .send({
          email: 'test@test.com',
          password: 'bad_password'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({"errors":{"password":{"type":"Password is incorrect."}}})
        .end(done);
    });

    it('should fail if not logged in', function (done) {
      agent
        .del('/auth/session')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(400)
        .expect('Not logged in')
        .end(done);
    });
  });

  describe('logged in actions', function () {
    beforeEach(function(done) {
      loginUser(done);
    });

    it('should logout', function (done) {
      agent
        .del('/auth/session')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(200)
        .end(done);
    });

    it('should get user info', function (done) {
      agent
        .get('/auth/session')
        .expect(200)
        .expect({
          "_id": session_user.id,
          "email": "test@test.com",
          "username": "Foo User"
        })
        .end(done);
    });

  });
});
