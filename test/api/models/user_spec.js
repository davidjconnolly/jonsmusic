'use strict';

var User = require('../../../api/models/user');
var user;

describe('User Model', function() {
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

  it("sets all fields", function(){
    assert.equal('testCreate@test.com', user.email);
    assert.equal('Foo Create', user.username);
    assert(user.hashedPassword);
    assert(user.salt);
  });

});
