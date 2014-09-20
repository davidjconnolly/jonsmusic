'use strict';

describe('Users Controller', function () {
  beforeEach(function(done) {
    resetDB(done);
  });

  it('should create user', function (done) {
    agent
      .post('/auth/users')
      .send({
        email: 'testCreate@test.com',
        username: 'Foo Create User',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(/"email":"testCreate@test.com"/)
      .expect(/"username":"Foo Create User"/)
      .end(done);
  });

  it('should get username', function (done) {
    agent
      .get('/auth/users/' + session_user.id)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        "username": "Foo User"
      })
      .end(done);
  });

  it('should check if username exists', function (done) {
    agent
      .get('/auth/check_username/' + session_user.username)
      .send({
        email: 'testCreate@test.com',
        username: 'Foo Create User',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({"exists": true})
      .end(done);
  });

});
