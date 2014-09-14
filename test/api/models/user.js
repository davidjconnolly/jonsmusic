var User = require('../../../api/models/user');

describe('User', function() {
  var user
  var now = Date()

  before(function(done) {
    clearDB(done);
  });

  before(function (done) {
    User.create({
      email: 'test@test.com',
      username: 'Foo User',
      password: 'password'
    }).then(function (u) {
      user = u
      done();
    });
  });

  it("sets all fields properly", function(){
    assert.equal('test@test.com', user.email);
    assert.equal('Foo User', user.username);
    assert(user.hashedPassword)
    assert(user.salt)
    // assert.equal(undefined, user.password);
  });

});
