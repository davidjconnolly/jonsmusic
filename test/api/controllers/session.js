var User = require('../../../api/models/user');
var agent = request.agent(app)

describe('Session Controller', function () {
  var user;

  before(function(done) {
    clearDB(done);
  });

  before(function(done) {
    user = new User({
      email: 'test@test.com',
      username: 'Foo User',
      password: 'password'
    });
    user.save(done)
  });

  describe('Login test', function () {
    it('should return user credentials', function (done) {
      agent
        .post('/auth/session')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          "_id": user.id,
          "email": "test@test.com",
          "username": "Foo User"
        })
        .end(done)
    })

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
        .end(done)
    })

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
        .end(done)
    })

    after(function(done) {
      User.remove().exec();
      return done();
    });

  })
})
