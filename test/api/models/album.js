var Album = require('../../../api/models/album');

describe('Album', function() {
  var album
  var now = Date()

  before(function (done) {
    Album.create({
      title : "foo title",
      description : "foo description",
      date : now,
      published: false
    }).then(function (a) {
      album = a
      done()
    })
  })

  it("sets all fields properly", function(){
    assert.equal('foo title', album.title)
    assert.equal('foo description', album.description)
    assert.equal(now, album.date)
    assert.equal(false, album.published)
  });

});
