'use strict';

describe('AWS Controller', function () {
  beforeEach(function(done) {
    resetDB(done);
  });

  beforeEach(function(done) {
    loginUser(done);
  });

  it('should retrieve AWS parameters', function (done) {
    agent
      .get('/api/admin/s3Policy?mimeType=audio/mp3')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

});
