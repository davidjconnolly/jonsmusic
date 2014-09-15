'use strict';

var User = require('../../../api/models/user');

describe('User', function() {
  var user;

  before(function(done) {
    resetDB(done);
  });

  before(function (done) {
    User.create({
      email: 'testCreate@test.com',
      username: 'Foo Create',
      password: 'password'
    }).then(function (u) {
      user = u;
      done();
    });
  });

  it("sets all fields properly", function(){
    assert.equal('testCreate@test.com', user.email);
    assert.equal('Foo Create', user.username);
    assert(user.hashedPassword);
    assert(user.salt);
    // assert.equal(undefined, user.password);
  });

});
